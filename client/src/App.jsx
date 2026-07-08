import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LicenseAnalytics from "./pages/LicenseAnalytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardForm from "./pages/Dashboard";
import RecentLogs from "./pages/RecentLogs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import LicenseDetails from "./pages/LicenseDetails";
import LabWiseLicenses from "./pages/LabWiseLicenses";
import ModuleUsage from "./pages/ModuleUsage";
import ModuleVisualization from "./pages/ModuleVisualization";
import MSCDashboard from "./pages/MSCDashboard";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";
import { useState } from "react";

function Header() {
  const { user, logout, theme, toggleTheme } =
    useAuth();

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const menuLinks = user
    ? user.role === "admin"
      ? [
          { label: "Dashboard", to: "/admin" },
          { label: "Lab-wise Licenses", to: "/admin/labwise-licenses" },
          { label: "License Details", to: "/admin/license-details" },
          { label: "License Analytics", to: "/admin/licenses" },
          { label: "Lab Analytics", to: "/admin/labs" },
        ]
      : [
          { label: "Dashboard", to: "/dashboard" },
          { label: "Recent Logs", to: "/logs" },
        ]
    : [];

  const themeLabel = theme === "dark" ? "Light Mode" : "Dark Mode";

  return (
    <header className="bg-blue-600 dark:bg-slate-900 text-white shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
            <img src="/image.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-wide">Software License Analytics</p>
            <p className="text-sm text-slate-200 dark:text-slate-400">Professional license monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <button
            className="p-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 w-6 bg-white mb-1 rounded-full" />
            <span className="block h-0.5 w-6 bg-white mb-1 rounded-full" />
            <span className="block h-0.5 w-6 bg-white rounded-full" />
          </button>
        </div>

        <nav className="hidden sm:flex items-center gap-4">
          {menuLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm font-medium px-4 py-2 rounded-full bg-white/90 text-slate-950 hover:bg-slate-100 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {item.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/"
                className="text-sm font-medium px-4 py-2 rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-sm font-medium px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="text-sm font-medium px-4 py-2 rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} sm:hidden border-t border-white/20 bg-white/95 dark:bg-slate-950/95 dark:border-slate-700/70 px-4 pb-4`}>
        <div className="flex flex-col gap-2 pt-3">
          {menuLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium px-4 py-3 rounded-xl bg-white/90 text-slate-950 hover:bg-slate-100 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {item.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium px-4 py-3 rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium px-4 py-3 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-sm font-medium w-full text-left px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="text-sm font-medium px-4 py-3 rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Private({
  children,
}) {
  const { user } =
    useAuth();

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

function AdminPrivate({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Software License Analytics Management System.</p>
        <p>Software license dummy data dashboard prototype.</p>
      </div>
    </footer>
  );
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AdminPrivate>
                <AdminLayout />
              </AdminPrivate>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="labwise-licenses" element={<LabWiseLicenses />} />
            <Route path="license-details" element={<LicenseDetails />} />
            <Route path="licenses" element={<LicenseAnalytics />} />
            <Route path="module-usage" element={<ModuleUsage />} />
            <Route path="module-visualization" element={<ModuleVisualization />} />
          </Route>

          <Route
            path="/"
            element={
              <PublicRoute>
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
                  <Header />

                  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1">
                    <Login />
                  </main>

                  <Footer />
                </div>
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
                  <Header />

                  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1">
                    <Register />
                  </main>

                  <Footer />
                </div>
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
                <Header />

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1">
                  <Private>
                    <DashboardForm />
                  </Private>
                </main>

                <Footer />
              </div>
            }
          />

          <Route
            path="/logs"
            element={
              <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col">
                <Header />

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1">
                  <Private>
                    <RecentLogs />
                  </Private>
                </main>

                <Footer />
              </div>
            }
          />
<Route
  path="/mscdashboard"
  element={
    <Private>
      <MSCDashboard />
    </Private>
  }
/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}