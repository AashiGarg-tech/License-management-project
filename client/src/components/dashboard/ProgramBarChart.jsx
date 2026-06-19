import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { totalColor } from "../../utils/chartColors";

const ProgramBarChart = ({
  selectedLicense,
}) => {
  return (
    <div className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 rounded-3xl shadow-2xl p-6 ring-1 ring-slate-200/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:ring-slate-700/60">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        {selectedLicense.name} Programs
      </h2>

      <div className="h-[400px] min-h-[400px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={
              selectedLicense.programs
            }
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="users"
              fill={totalColor}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgramBarChart;