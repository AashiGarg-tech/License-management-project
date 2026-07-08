import React from "react";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  predictionSummary,
} from "../../data/predictionData";

const PredictionSummary = ({
  selectedModule = "ADAMS_View",
}) => {
  const rows =
    predictionSummary[selectedModule];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-lg font-semibold">
            Prediction Summary
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Current vs Predicted values
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3 text-sm font-semibold text-slate-600">
                Metric
              </th>

              <th className="text-center py-3 text-sm font-semibold text-slate-600">
                Current
              </th>

              <th className="text-center py-3 text-sm font-semibold text-slate-600">
                Predicted
              </th>

              <th className="text-center py-3 text-sm font-semibold text-slate-600">
                Change
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (

              <tr
                key={row.metric}
                className="border-b last:border-0 hover:bg-slate-50"
              >

                <td className="py-4 font-medium">
                  {row.metric}
                </td>

                <td className="text-center">
                  {row.current}
                </td>

                <td className="text-center font-semibold">
                  {row.predicted}
                </td>

                <td className="text-center">

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      row.positive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {row.positive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}

                    {row.change}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PredictionSummary;