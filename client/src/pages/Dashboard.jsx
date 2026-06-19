import { useState } from "react";
import api from "../api";
export default function DashboardForm() {
  const [form, setForm] = useState({
    license: "",
    product: "",
    network: "",
    mac: "",
    ip: "",
    screenshot: null,
  });

  const productsMap = {
    "Microsoft Windows Server": ["Server 2019", "Server 2022"],
    "Microsoft Office": ["MS Excel", "MS Word", "MS PowerPoint", "Program 1", "Program 2", "Program 3", "Program 4", "Program 5"],
    "SQL Server": ["SQL Dev", "SQL Enterprise", "SQL Express"],
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, screenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
   try {
  await api.post(
    "/license/submit",
    {
      license: form.license,
      product: form.product,
      network: form.network,
      mac: form.mac,
      ip: form.ip,
      screenshot: form.screenshot?.name || null,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  alert("License request submitted!");
} catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message ||
    "Submission failed"
  );
}

    
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto card-surface p-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-950 dark:text-slate-100">License Request</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Submit a new license request for review.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-400 mb-1">License Type</label>
              <select
                name="license"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-950 rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">Select License</option>
                <option>Microsoft Windows Server</option>
                <option>Microsoft Office</option>
                <option>SQL Server</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-400 mb-1">Product</label>
              <select
                name="product"
                onChange={handleChange}
                disabled={!form.license}
                className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-950 rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">Select Product</option>

                {form.license &&
                  productsMap[form.license].map((p, i) => (
                    <option key={i}>{p}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-400 mb-1">Network Type</label>
              <select name="network" onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-950 rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                <option value="">Select Network Type</option>
                <option>LAN</option>
                <option>WiFi</option>
                <option>VPN</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-400 mb-1">Screenshot</label>
              <input type="file" onChange={handleFile} className="w-full text-slate-950 dark:text-slate-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="mac"
              placeholder="MAC Address"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-950 rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />

            <input
              name="ip"
              placeholder="IP Address"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-950 rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}