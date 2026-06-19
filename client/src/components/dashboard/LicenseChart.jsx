import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  licenseDistribution,
} from "../../data/excelDummyData";

import {
  licenseColors,
} from "../../utils/chartColors";

const LicenseChart = ({
  setSelectedLicense,
}) => {
  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-slate-50 rounded-3xl shadow-2xl p-6 ring-1 ring-slate-200/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:ring-slate-700/60">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        License Distribution
      </h2>

      <div className="h-[400px] min-h-[400px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={licenseDistribution}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              onClick={(data) =>
                setSelectedLicense(data)
              }
              label
            >
              {licenseDistribution.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      licenseColors[
                        index %
                          licenseColors.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LicenseChart;