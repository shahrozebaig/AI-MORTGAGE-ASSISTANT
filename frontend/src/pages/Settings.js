import { useState } from "react";
import Topbar from "../components/Topbar";

export default function Settings() {
  const [name, setName] = useState(localStorage.getItem("userName") || "");

  const saveName = () => {
    localStorage.setItem("userName", name);
    alert("Name saved successfully!");
  };

  return (
    <div>
      <Topbar title="Settings" />

      <div className="dash-bento dash-bento-animate bg-white dark:bg-gray-800 p-6 max-w-md">
        <h2 className="font-semibold mb-4 text-lg">User Profile</h2>

        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
          Display Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-5 p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={saveName}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-lg transition transform hover:scale-105"
        >
          Save Name
        </button>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Your name will appear in the dashboard top bar for a personalized experience.
        </div>
      </div>
    </div>
  );
}
