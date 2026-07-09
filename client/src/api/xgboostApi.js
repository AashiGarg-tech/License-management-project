import axios from "axios";

const API = "http://localhost:5001/api/xgboost";

export const getPredictions = async () => {
    const response = await axios.get(`${API}/predictions`);
    return response.data;
};