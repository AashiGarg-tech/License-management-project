import { useState } from "react";
import { labDistribution } from "../data/excelDummyData";
import ProgramConsumption from "../components/dashboard/ProgramConsumption";

const LabWiseLicenses = () => {
  const [selectedLab, setSelectedLab] = useState(labDistribution[0]);

  const selectedConsumed = selectedLab.programs.reduce((sum, prog) => sum + prog.consumed, 0);
  const selectedUtilization = selectedLab.value
    ? Math.round((selectedConsumed / selectedLab.value) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Lab-wise Licenses</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Monitor software license distribution and usage across different laboratory spaces.
        </p>
      </div>

      {/* Lab Selector */}
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] items-end">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Select Lab
          </label>
          <select
            value={selectedLab.lab}
            onChange={(event) => {
              const newLab = labDistribution.find((lab) => lab.lab === event.target.value);
              if (newLab) {
                setSelectedLab(newLab);
              }
            }}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-4 py-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            {labDistribution.map((lab) => (
              <option key={lab.lab} value={lab.lab}>
                {lab.lab}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-lg font-semibold">Selected Lab</h2>
          <p className="mt-2 text-3xl font-bold">{selectedLab.lab}</p>
          <p className="mt-2 text-sm opacity-90">
            Showing analytics and license consumption for the selected lab.
          </p>
        </div>
      </div>

      {/* Selected Lab Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {selectedLab.lab} - Program Consumption
          </h2>
          <ProgramConsumption selectedLab={selectedLab} />
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Total Programs</h3>
            <p className="text-3xl font-bold">{selectedLab.programs.length}</p>
            <p className="text-xs opacity-75 mt-1">Programs active in this lab</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Total License Count</h3>
            <p className="text-3xl font-bold">{selectedLab.value}</p>
            <p className="text-xs opacity-75 mt-1">Assigned across this lab</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Utilization</h3>
            <p className="text-3xl font-bold">{selectedUtilization}%</p>
            <p className="text-xs opacity-75 mt-1">Current lab usage</p>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lab Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Lab Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Total Licenses</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">In Use</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Available</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {labDistribution.map((lab, idx) => (
                <tr
                  key={lab.lab}
                  className={`border-b border-slate-200 dark:border-slate-700 ${
                    idx % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800"
                  } hover:bg-blue-50 dark:hover:bg-slate-700 transition`}
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lab.lab}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{lab.value}</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {lab.programs.reduce((sum, prog) => sum + prog.consumed, 0)}
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {lab.value - lab.programs.reduce((sum, prog) => sum + prog.consumed, 0)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          style={{ width: `${Math.round((lab.programs.reduce((sum, prog) => sum + prog.consumed, 0) / lab.value) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {Math.round((lab.programs.reduce((sum, prog) => sum + prog.consumed, 0) / lab.value) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabWiseLicenses;
