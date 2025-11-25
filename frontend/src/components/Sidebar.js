import { NavLink } from "react-router-dom";

export default function Sidebar({ dark, setDark }) {
  const menuItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-gray-700";

  const activeItem =
    "bg-blue-600 text-white dark:bg-blue-700";

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-5 animate-slideIn">
      
      {/* LOGO */}
      <h2 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">
        Mortgage AI
      </h2>

      {/* MENU */}
      <nav className="space-y-2">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : "text-gray-700 dark:text-gray-200"}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/upload"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : "text-gray-700 dark:text-gray-200"}`
          }
        >
          ⬆ Upload Loan
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : "text-gray-700 dark:text-gray-200"}`
          }
        >
          📁 Reports
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : "text-gray-700 dark:text-gray-200"}`
          }
        >
          ⚙ Settings
        </NavLink>

      </nav>

      {/* THEME TOGGLE */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setDark(!dark)}
          className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-90"
        >
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

    </aside>
  );
}
