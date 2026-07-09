import { exec } from "child_process";

export const getPredictions = (req, res) => {

  const pythonPath = process.env.PYTHON_PATH;

  exec(
    `${pythonPath} ml/predict.py`,
    { cwd: process.cwd() },
    (error, stdout, stderr) => {

      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Prediction failed",
        });
      }

      if (stderr) {
        console.error(stderr);
      }

      try {

        const predictions = JSON.parse(stdout);
        res.json(predictions);

      } catch (err) {

        console.error(err);

        res.status(500).json({
          message: "Invalid prediction output",
        });

      }

    }
  );

};