import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user, theme, toggleTheme } = useAuth();

  const navItems = [
    { label: "Dashboard", to: "/admin" },
    { label: "Lab-wise Licenses", to: "/admin/labwise-licenses" },
    { label: "License Details", to: "/admin/license-details" },
    { label: "License Analytics", to: "/admin/licenses" },
  ];

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-100">
      <header className="bg-blue-600 dark:bg-slate-900 text-white shadow-xl border-b border-white/10 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10 ring-1 ring-white/20 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/image.png" 
                  alt="Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-wide text-white truncate">
                  Software License Analytics
                </p>
                <p className="text-sm text-sky-100 dark:text-slate-300 truncate">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    isActive(item.to)
                      ? "bg-white text-sky-700 shadow-lg"
                      : "bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={() => setMoreMenuOpen((prev) => !prev)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition whitespace-nowrap"
                >
                  More
                </button>
                {moreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-800 shadow-lg z-20">
                    <Link
                      to="/admin/module-usage"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Module Usage
                    </Link>
                    <Link
                      to="/admin/module-visualization"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Module Visualization
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle - Desktop */}
              <button
                onClick={toggleTheme}
                className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-slate-950 hover:bg-white transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 whitespace-nowrap"
              >
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>

              {/* User Info and Logout - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="h-9 px-3 rounded-full bg-white/20 text-white text-sm font-medium flex items-center whitespace-nowrap">
                  {user?.name}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="block h-0.5 w-6 bg-white mb-1.5 rounded-full" />
                <span className="block h-0.5 w-6 bg-white mb-1.5 rounded-full" />
                <span className="block h-0.5 w-6 bg-white rounded-full" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 mt-4 pt-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                      isActive(item.to)
                        ? "bg-white text-sky-700"
                        : "bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg bg-white/90 text-slate-700 text-sm font-medium hover:bg-white transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-left"
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>

                <Link
                  to="/admin/module-usage"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                    location.pathname === "/admin/module-usage"
                      ? "bg-white text-sky-700"
                      : "bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  Module Usage
                </Link>

                <Link
                  to="/admin/module-visualization"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                    location.pathname === "/admin/module-visualization"
                      ? "bg-white text-sky-700"
                      : "bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  Module Visualization
                </Link>

                <div className="h-12 px-4 rounded-lg bg-white/20 text-white text-sm font-medium flex items-center">
                  {user?.name}
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Software License Analytics Management System.</p>
          <p>Software license dummy data dashboard prototype.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
