import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../api";
const COLORS = ["#0ea5e9", "#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a", "#f59e0b", "#ec4899", "#8b5cf6"];

export default function ModuleVisualization() {
  const [logs, setLogs] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

 
useEffect(() => {
  const fetchLogs = async () => {
    try {
      const res = await api.get("/license/logs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setLogs([]);
    }
  };

  fetchLogs();
}, []);

  // Day-wise analysis
  const dayWiseData = useMemo(() => {
    const days = {};
    logs.forEach((log) => {
      if (!log.timestamp) return;
      const date = new Date(log.timestamp);
      const now = new Date();
      if (date.toDateString() !== now.toDateString()) return;

      const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      days[time] = (days[time] || 0) + 1;
    });

    return Object.entries(days)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, count]) => ({ time, usage: count }));
  }, [logs]);

  // Week-wise analysis
  const weekWiseData = useMemo(() => {
    const days = {};
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    logs.forEach((log) => {
      if (!log.timestamp) return;
      const date = new Date(log.timestamp);
      const now = new Date();
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);

      if (date < start || date > now) return;

      const dayIndex = date.getDay();
      const dayName = dayNames[dayIndex];
      days[dayName] = (days[dayName] || 0) + 1;
    });

    return dayNames
      .map((day) => ({ day, usage: days[day] || 0 }))
      .filter((d) => d.usage > 0 || dayNames.indexOf(d.day) <= new Date().getDay());
  }, [logs]);

  // Month-wise analysis
  const monthWiseData = useMemo(() => {
    const dates = {};
    logs.forEach((log) => {
      if (!log.timestamp) return;
      const date = new Date(log.timestamp);
      const now = new Date();
      if (date.getMonth() !== now.getMonth() || date.getFullYear() !== now.getFullYear()) return;

      const day = date.getDate();
      dates[day] = (dates[day] || 0) + 1;
    });

    return Object.entries(dates)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([date, count]) => ({ date: `Day ${date}`, usage: count }));
  }, [logs]);

  // Module analysis
  const modules = useMemo(() => {
    const mods = new Set();
    logs.forEach((log) => {
      const product = log.product || log.data?.product || log.data?.license;
      if (product) mods.add(product);
    });
    return Array.from(mods).sort();
  }, [logs]);

  // Lab usage for selected module
  const moduleLabData = useMemo(() => {
    if (!selectedModule) return [];

    const labs = {};
    logs.forEach((log) => {
      const product = log.product || log.data?.product || log.data?.license;
      if (product !== selectedModule) return;

      const lab = log.lab || log.data?.ip || "Unknown Lab";
      labs[lab] = (labs[lab] || 0) + 1;
    });

    return Object.entries(labs)
      .sort((a, b) => b[1] - a[1])
      .map(([lab, count]) => ({ lab, count }));
  }, [logs, selectedModule]);

  // Module distribution
  const moduleDistribution = useMemo(() => {
    const mods = {};
    logs.forEach((log) => {
      const product = log.product || log.data?.product || log.data?.license || "Unknown";
      mods[product] = (mods[product] || 0) + 1;
    });

    return Object.entries(mods)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [logs]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-100">Module Usage Visualization</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Analyze module usage patterns across different time periods and identify lab-wise consumption.
        </p>
      </div>

      {/* Day-wise Chart */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Day-wise Usage (Today)</h2>
        {dayWiseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
              />
              <Bar dataKey="usage" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-slate-500">No data available for today.</p>
        )}
      </div>

      {/* Week-wise Chart */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Week-wise Usage (This Week)</h2>
        {weekWiseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weekWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
              />
              <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-slate-500">No data available for this week.</p>
        )}
      </div>

      {/* Month-wise Chart */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Month-wise Usage (This Month)</h2>
        {monthWiseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
              />
              <Bar dataKey="usage" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-slate-500">No data available for this month.</p>
        )}
      </div>

      {/* Module Distribution */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Module Distribution</h2>
        {moduleDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moduleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {moduleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-slate-500">No module data available.</p>
        )}
      </div>

      {/* Module-wise Lab Analysis */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Lab-wise Module Usage</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Select a module to see which labs used it most.</p>
          </div>

          <select
            value={selectedModule || ""}
            onChange={(e) => setSelectedModule(e.target.value || null)}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">-- Select a module --</option>
            {modules.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        {selectedModule && moduleLabData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleLabData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="lab" type="category" stroke="#6b7280" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
              />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : selectedModule ? (
          <p className="text-sm text-slate-500">No lab data available for this module.</p>
        ) : (
          <p className="text-sm text-slate-500">Select a module from the dropdown to view lab-wise usage.</p>
        )}
      </div>
    </div>
  );
}
