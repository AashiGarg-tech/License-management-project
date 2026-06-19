import DashboardContainer from "../components/dashboard/DashboardContainer";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Welcome to your license management dashboard. Here's an overview of your software licenses across all laboratories.
        </p>
      </div>

      {/* Dashboard Container */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl shadow-2xl p-6 ring-1 ring-slate-200/60 dark:ring-slate-700/70">
        <DashboardContainer />
      </div>
    </div>
  );
};

export default AdminDashboard;