import React from "react";
import { TrendingUp } from "lucide-react";

import { futurePredictions } from "../../data/predictionData";

const FuturePredictions = ({
  selectedModule = "ADAMS_View",
}) => {
  const predictions =
    futurePredictions[selectedModule];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-6">
        Future Predictions
      </h2>

      <div className="space-y-3">

        {predictions.map((item) => (

          <div
            key={item.period}
            className="border rounded-xl p-4 hover:bg-slate-50 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  {item.period}
                </p>

                <h2 className="text-l font-bold text-slate-900 mt-2">
                  {item.value}
                </h2>

              </div>

              <div className="flex items-center gap-1 text-green-600 font-semibold">

                <TrendingUp size={18} />

                {item.change}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default FuturePredictions;