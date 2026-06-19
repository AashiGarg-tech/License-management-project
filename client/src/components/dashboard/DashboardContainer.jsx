import { useState } from "react";

import {
  licenseDistribution,
  labDistribution,
} from "../../data/excelDummyData";

import StatCards from "./StatCards";
import LicenseChart from "./LicenseChart";
import ProgramBarChart from "./ProgramBarChart";
import LabDistribution from "./LabDistribution";
import ProgramConsumption from "./ProgramConsumption";

const DashboardContainer = () => {
  const [selectedLicense,
    setSelectedLicense] =
    useState(
      licenseDistribution[0]
    );

  const [selectedLab,
    setSelectedLab] =
    useState(
      labDistribution[0]
    );

  return (
    <div className="space-y-8">
      <StatCards />

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
    </div>
  );
};

export default DashboardContainer;