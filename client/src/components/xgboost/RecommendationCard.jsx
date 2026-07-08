import React from "react";
import { recommendations } from "../../data/predictionData";

const colors = {
  red: {
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
  },
  amber: {
    badge: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-200",
  },
  green: {
    badge: "bg-green-100 text-green-700",
    border: "border-green-200",
  },
};

const RecommendationCard = ({
  selectedModule = "ADAMS_View",
}) => {
  const data = recommendations[selectedModule];

  const style = colors[data.color];

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-6 border ${style.border}`}
    >
      <h2 className="text-lg font-semibold mb-5">
        AI Recommendation
      </h2>

      <div className="flex items-center justify-between">

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${style.badge}`}
        >
          {data.risk} Risk
        </span>

        <span className="text-sm text-slate-500">
          Confidence
          <span className="ml-2 font-bold text-slate-900">
            {data.confidence}
          </span>
        </span>

      </div>

      <div className="mt-6">

        <h3 className="text-xl font-bold text-slate-900">
          {data.recommendation}
        </h3>

      </div>

      <div className="mt-3">

        <h4 className="font-semibold text-slate-700 mb-3">
          Why?
        </h4>

        <ul className="space-y-2 text-sm text-slate-600 list-disc ml-5">

          {data.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}

        </ul>

      </div>

      <div className="mt-6">

        <h4 className="font-semibold text-slate-700 mb-3">
          Suggested Actions
        </h4>

        <ul className="space-y-2 text-sm text-slate-600 list-disc ml-5">

          {data.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}

        </ul>

      </div>

    </div>
  );
};

export default RecommendationCard;