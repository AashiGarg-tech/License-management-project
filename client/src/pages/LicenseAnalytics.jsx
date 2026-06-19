import { useState } from "react";

import LabDistribution from "../components/dashboard/LabDistribution";
import ProgramConsumption from "../components/dashboard/ProgramConsumption";
import LabWiseLicenseChart from "../components/dashboard/LabWiseLicenseChart";

import {
  labDistribution,
} from "../data/excelDummyData";

export default function LabAnalytics() {

  const [
    selectedLab,
    setSelectedLab,
  ] = useState(
    labDistribution[0]
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A] dark:text-white">
          Lab Analytics
        </h1>

        <p className="text-slate-500 mt-1">
          View lab-wise
          license allocation
          and consumption
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <LabDistribution
          setSelectedLab={
            setSelectedLab
          }
        />

        <ProgramConsumption
          selectedLab={
            selectedLab
          }
        />

      </div>

      <LabWiseLicenseChart />

    </div>
  );
}