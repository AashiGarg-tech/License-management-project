import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { labDistribution } from "../../data/excelDummyData";
import { totalColor, usedColor } from "../../utils/chartColors";

const LabWiseLicenseChart = () => {
  const data = labDistribution.map((lab) => ({
    name: lab.lab,
    licenses: lab.value,
    consumed: lab.programs.reduce((sum, item) => sum + item.consumed, 0),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lab License Usage</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare lab license count and consumption.
          </p>
        </div>
      </div>

      <div className="h-[420px] min-h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
            <XAxis dataKey="name" tick={{ fill: '#64748B' }} />
            <YAxis tick={{ fill: '#64748B' }} />
            <Tooltip wrapperStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)' }} />
            <Bar dataKey="licenses" fill={totalColor} radius={[8, 8, 0, 0]} />
            <Bar dataKey="consumed" fill={usedColor} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LabWiseLicenseChart;
