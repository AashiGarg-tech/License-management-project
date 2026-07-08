import React from "react";
import {
  modules,
  moduleStats,
} from "../../data/predictionData";

const ModuleSelector = ({
  selectedModule,
  setSelectedModule,
}) => {
  const stats = moduleStats[selectedModule];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Select Module
      </h2>

      <select
        value={selectedModule}
        onChange={(e) =>
          setSelectedModule(e.target.value)
        }
        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {modules.map((module) => (
          <option
            key={module}
            value={module}
          >
            {module}
          </option>
        ))}
      </select>

      <div className="mt-8 space-y-5">

        <div>

          <p className="text-sm text-slate-500">
            Current Peak
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            {stats.currentPeak}
          </h2>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Utilization
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {stats.utilization}
          </h2>

        </div>

        <div>

          <p className="text-sm text-slate-500 mb-2">
            Status
          </p>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${stats.bg} ${stats.color}`}
          >
            {stats.status}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ModuleSelector;