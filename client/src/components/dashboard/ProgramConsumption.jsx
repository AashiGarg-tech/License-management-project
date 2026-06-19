import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  totalColor,
  usedColor,
} from "../../utils/chartColors";

const ProgramConsumption = ({
  selectedLab,
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl shadow-2xl p-6 ring-1 ring-slate-200/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:ring-slate-700/60">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        {selectedLab.lab}
        Consumption
      </h2>

      <div className="h-[400px] min-h-[400px]">
        <ResponsiveContainer>
          <BarChart
            data={
              selectedLab.programs
            }
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="total"
              fill={totalColor}
            />

            <Bar
              dataKey="consumed"
              fill={usedColor}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgramConsumption;