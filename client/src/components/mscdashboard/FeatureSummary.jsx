import React from "react";
import { featureSummary } from "../../data/dashboardData";

const FeatureSummary = ({ selectedPeriod }) => {
  const data = featureSummary[selectedPeriod];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">

      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-base font-semibold">
            Feature Summary ({selectedPeriod})
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Software license activity overview
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-xs">

          <thead>

            <tr className="border-b text-slate-500">

              <th className="text-left py-3 font-semibold">
                Feature
              </th>

              <th className="text-center font-semibold">
                OUT
              </th>

              <th className="text-center font-semibold">
                IN
              </th>

              <th className="text-center font-semibold">
                Denied
              </th>

              <th className="text-center font-semibold">
                Queued
              </th>

              <th className="text-center font-semibold">
                Dequeued
              </th>

              <th className="text-center font-semibold">
                Peak
              </th>

              <th className="text-center font-semibold">
                Users
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((row) => (

              <tr
                key={row.feature}
                className="border-b last:border-0 hover:bg-slate-50 transition"
              >

                <td className="py-3 font-medium text-slate-700">
                  {row.feature}
                </td>

                <td className="text-center">
                  {row.out.toLocaleString()}
                </td>

                <td className="text-center">
                  {row.in.toLocaleString()}
                </td>

                <td className="text-center text-red-600 font-semibold">
                  {row.denied}
                </td>

                <td className="text-center">
                  {row.queued}
                </td>

                <td className="text-center">
                  {row.dequeued}
                </td>

                <td className="text-center font-semibold">
                  {row.peak}
                </td>

                <td className="text-center">
                  {row.users}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <p className="text-xs text-slate-400 mt-4">
        * Utilization requires purchased license count and is omitted.
      </p>

    </div>
  );
};

export default FeatureSummary;