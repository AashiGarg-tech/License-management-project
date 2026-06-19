import { useEffect, useMemo, useState } from "react";
import api from "../api";
const formatNumber = (value) => new Intl.NumberFormat().format(value);

const filters = {
  day: (date) => {
    const now = new Date();
    return date.toDateString() === now.toDateString();
  },
  week: (date) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    return date >= start && date <= now;
  },
  month: (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  },
};

const MetricCard = ({ label, value, subtext, icon, trend }) => (
  <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 dark:border-slate-700/80 p-4 shadow-sm hover:shadow-md transition">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-100">{value}</p>
        {subtext && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtext}</p>}
        {trend && (
          <p className={`mt-2 text-xs font-semibold flex items-center gap-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% change
          </p>
        )}
      </div>
      {icon && <div className="text-3xl opacity-20">{icon}</div>}
    </div>
  </div>
);

export default function ModuleUsage() {
  const [logs, setLogs] = useState([]);
  const [period, setPeriod] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("count");

  useEffect(() => {
  const fetchLogs = async () => {
    try {
      const res = await api.get(
        "/license/logs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLogs(res.data);
    } catch (err) {
      console.error(err);
      setLogs([]);
    }
  };

  fetchLogs();
}, []);

  const filteredLogs = useMemo(
    () => logs.filter((log) => {
      if (!log.timestamp) return false;
      const date = new Date(log.timestamp);
      return filters[period](date);
    }),
    [logs, period]
  );

  const summary = useMemo(() => {
    const moduleCounts = {};
    const labCounts = {};
    const systemCounts = {};
    const userCounts = {};

    filteredLogs.forEach((log) => {
      const product = log.product || log.data?.product || log.data?.license || "Unknown module";
      const lab = log.lab || log.data?.ip || "Unknown lab";
      const system = log.systemId || log.data?.mac || "Unknown device";
      const user = log.user || "anonymous";

      moduleCounts[product] = (moduleCounts[product] || 0) + 1;
      labCounts[lab] = (labCounts[lab] || 0) + 1;
      systemCounts[system] = (systemCounts[system] || 0) + 1;
      userCounts[user] = (userCounts[user] || 0) + 1;
    });

    const sortCounts = (counts) =>
      Object.entries(counts)
        .sort((a, b) => b[1] - a[1]);

    const moduleEntries = sortCounts(moduleCounts);
    const labEntries = sortCounts(labCounts);
    const systemEntries = sortCounts(systemCounts);

    // Filter by search
    let filtered = moduleEntries;
    if (searchTerm) {
      filtered = moduleEntries.filter(([mod]) => mod.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort
    if (sortBy === "alpha") {
      filtered = filtered.sort((a, b) => a[0].localeCompare(b[0]));
    }

    return {
      total: filteredLogs.length,
      moduleTop: moduleEntries.slice(0, 10),
      labTop: labEntries.slice(0, 5),
      systemTop: systemEntries.slice(0, 5),
      modulesFiltered: filtered.slice(0, 15),
      uniqueModules: Object.keys(moduleCounts).length,
      uniqueLabs: Object.keys(labCounts).length,
      uniqueSystems: Object.keys(systemCounts).length,
      avgUsagePerModule: Object.keys(moduleCounts).length > 0 ? (filteredLogs.length / Object.keys(moduleCounts).length).toFixed(1) : 0,
    };
  }, [filteredLogs, searchTerm, sortBy]);

  const periodCounts = useMemo(() => {
    // Compare current with previous period
    const now = new Date();
    let prevStart, currStart;

    if (period === "day") {
      currStart = new Date(now);
      currStart.setHours(0, 0, 0, 0);
      prevStart = new Date(currStart);
      prevStart.setDate(currStart.getDate() - 1);
    } else if (period === "week") {
      currStart = new Date(now);
      currStart.setDate(now.getDate() - now.getDay());
      currStart.setHours(0, 0, 0, 0);
      prevStart = new Date(currStart);
      prevStart.setDate(currStart.getDate() - 7);
    } else {
      currStart = new Date(now.getFullYear(), now.getMonth(), 1);
      prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    const currCount = logs.filter((l) => {
      const d = new Date(l.timestamp);
      return d >= currStart && d <= now;
    }).length;

    const prevCount = logs.filter((l) => {
      const d = new Date(l.timestamp);
      return d >= prevStart && d < currStart;
    }).length;

    const trend = prevCount > 0 ? Math.round(((currCount - prevCount) / prevCount) * 100) : currCount > 0 ? 100 : 0;

    return { currCount, prevCount, trend };
  }, [logs, period]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-100">Module Usage Analytics</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Real-time module consumption tracking by system ID (MAC), lab IP, and device. Compare trends across time periods with actionable insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(filters).map((key) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                period === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {key === "day" ? "Day" : key === "week" ? "Week" : "Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard label="Total Submissions" value={formatNumber(summary.total)} icon="📊" subtext="in selected period" />
        <MetricCard label="Unique Modules" value={summary.uniqueModules} icon="🔧" subtext={`avg ${summary.avgUsagePerModule} per module`} />
        <MetricCard label="Active Labs" value={summary.uniqueLabs} icon="🏢" subtext="using licenses" />
        <MetricCard label="Devices" value={summary.uniqueSystems} icon="💻" subtext="registered systems" />
      </div>

      {/* Period Comparison */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label={`Current ${period}`} value={periodCounts.currCount} icon="📈" trend={periodCounts.trend} />
          <MetricCard label={`Previous ${period}`} value={periodCounts.prevCount} icon="📉" />
          <MetricCard label="Change" value={`${periodCounts.trend > 0 ? "+" : ""}${periodCounts.trend}%`} icon="📊" />
        </div>
      </div>

      {/* Top Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Modules */}
        <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Top Modules</h2>
          {summary.moduleTop.length ? (
            <div className="space-y-3">
              {summary.moduleTop.slice(0, 8).map(([module, count], idx) => (
                <div key={module} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-bold text-blue-700 dark:text-blue-300">
                      {idx + 1}
                    </div>
                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{module}</span>
                  </div>
                  <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-6 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-bold text-blue-700 dark:text-blue-300">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No module data yet.</p>
          )}
        </div>

        {/* Top Labs */}
        <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Active Labs</h2>
          {summary.labTop.length ? (
            <div className="space-y-3">
              {summary.labTop.map(([lab, count]) => (
                <div key={lab} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{lab}</span>
                  <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-6 px-2 rounded-full bg-green-100 dark:bg-green-900 text-xs font-bold text-green-700 dark:text-green-300">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No lab data yet.</p>
          )}
        </div>

        {/* Top Systems */}
        <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Top Devices</h2>
          {summary.systemTop.length ? (
            <div className="space-y-3">
              {summary.systemTop.map(([system, count]) => (
                <div key={system} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[140px]" title={system}>
                    {system.length > 12 ? system.substring(0, 10) + "..." : system}
                  </span>
                  <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center h-6 px-2 rounded-full bg-purple-100 dark:bg-purple-900 text-xs font-bold text-purple-700 dark:text-purple-300">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No device data yet.</p>
          )}
        </div>
      </div>

      {/* Module Search & Filter */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-100">Module Search & Filter</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Search and sort all modules by usage</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-950 placeholder-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="count">Sort by Usage</option>
              <option value="alpha">Sort by Name</option>
            </select>
          </div>
        </div>

        {summary.modulesFiltered.length ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {summary.modulesFiltered.map(([module, count]) => (
              <div key={module} className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 dark:border-slate-700/80 p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-950 dark:text-slate-100 truncate">{module}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{count} submissions</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {((count / summary.total) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No modules match your search.</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Recent Activity</h2>
        {filteredLogs.length ? (
          <div className="space-y-3">
            {filteredLogs.slice(0, 8).map((log) => (
              <div key={log.id} className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                      {log.product || log.data?.product || log.data?.license || "Unknown"}
                    </span>
                    <span className="inline-block rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300">
                      {log.lab || log.data?.ip || "No IP"}
                    </span>
                    <span className="inline-block rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 truncate max-w-[150px]">
                      {(log.systemId || log.data?.mac || "No MAC").substring(0, 15)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {log.user} • {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No recent activity for this time range.</p>
        )}
      </div>
    </div>
  );
}
