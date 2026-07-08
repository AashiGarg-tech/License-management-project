import React, { useState } from "react";

import Sidebar from "../components/mscdashboard/Sidebar";

import PredictionHeader from "../components/xgboost/PredictionHeader";
import PredictionTrend from "../components/xgboost/PredictionTrend";
import ModuleSelector from "../components/xgboost/ModuleSelector";
import FuturePredictions from "../components/xgboost/FuturePredictions";
import RecommendationCard from "../components/xgboost/RecommendationCard";
import PredictionSummary from "../components/xgboost/PredictionSummary";
import ModuleMultiSelect from "../components/xgboost/ModuleMultiSelect";

const PredictionDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");

  const [selectedModules, setSelectedModules] = useState([
    "ADAMS_View",
    "Patran",
    "Solver",
    "Marc",
  ]);

  const [selectedModule, setSelectedModule] =
    useState("ADAMS_View");

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 overflow-y-auto">

        <PredictionHeader
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        {/* Trend */}

        <div className="px-8 mt-6">

          <div className="flex justify-between items-start gap-4">

            <div className="flex-1">

              <PredictionTrend
                selectedPeriod={selectedPeriod}
                selectedModules={selectedModules}
              />

            </div>

            <ModuleMultiSelect
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
            />

          </div>

        </div>

        {/* Middle Row */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 px-8 mt-8">

  <div className="xl:col-span-3">
    <ModuleSelector
      selectedModule={selectedModule}
      setSelectedModule={setSelectedModule}
    />
  </div>

  <div className="xl:col-span-4">
    <FuturePredictions
      selectedModule={selectedModule}
    />
  </div>

  <div className="xl:col-span-5">
    <RecommendationCard
      selectedModule={selectedModule}
    />
  </div>

</div>

        {/* Bottom */}

        <div className="px-8 mt-8 mb-8">

          <PredictionSummary
            selectedModule={selectedModule}
          />

        </div>

      </div>

    </div>
  );
};

export default PredictionDashboard;