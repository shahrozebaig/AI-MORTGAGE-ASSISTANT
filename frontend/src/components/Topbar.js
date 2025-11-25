import { useEffect, useState } from "react";

export default function Topbar({ title }) {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
  }, []);

  return (
    <div className="dash-bento dash-bento-animate flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800">
      
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h1>

      <div className="flex items-center gap-5 relative">

        {/* Search */}
        <input
          type="text"
          placeholder="Search loans..."
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {userName}
          </span>
        </div>

      </div>
    </div>
  );
}
