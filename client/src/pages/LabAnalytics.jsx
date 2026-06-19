import { useState } from "react";

import LicenseChart from "../components/dashboard/LicenseChart";
import ProgramBarChart from "../components/dashboard/ProgramBarChart";

import {
  licenseDistribution,
} from "../data/excelDummyData";

export default function LicenseAnalytics() {

  const [
    selectedLicense,
    setSelectedLicense,
  ] = useState(
    licenseDistribution[0]
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A] dark:text-white">
          License Analytics
        </h1>

        <p className="text-slate-500 mt-1">
          Analyze software
          license usage and
          program consumption
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <LicenseChart
          setSelectedLicense={
            setSelectedLicense
          }
        />

        <ProgramBarChart
          selectedLicense={
            selectedLicense
          }
        />

      </div>

    </div>
  );
}