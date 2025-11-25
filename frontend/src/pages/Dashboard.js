import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loanHistory") || "[]");
    setHistory(data);
  }, []);

  const total = history.length;
  const approved = history.filter(l => l.decision === "Approved").length;
  const review = history.filter(l => l.decision === "Needs Review").length;
  const rejected = history.filter(l => l.decision === "Rejected").length;

  // PIE DATA
  const pieData = [
    { name: "Approved", value: approved },
    { name: "Needs Review", value: review },
    { name: "Rejected", value: rejected }
  ];

  // LINE DATA (risk trend)
  const lineData = history.slice().reverse().map(item => ({
    name: item.fileName.replace(/\.[^/.]+$/, "").slice(0, 12),
    risk: item.riskScore
  }));

  const COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">AI Mortgage Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Loans" value={total} color="text-blue-600" />
        <StatCard title="Approved" value={approved} color="text-green-600" />
        <StatCard title="Needs Review" value={review} color="text-yellow-500" />
        <StatCard title="Rejected" value={rejected} color="text-red-600" />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="dash-bento p-6 bg-white dark:bg-gray-800">
          <h2 className="font-semibold mb-4">Loan Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="dash-bento p-6 bg-white dark:bg-gray-800">
          <h2 className="font-semibold mb-4">Risk Trend Per File</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="dash-bento p-6 bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-3">Recent Loan Activity</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No activity yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {history.slice(0, 5).map(item => (
              <li key={item.id}>
                📄 {item.fileName} — {item.riskScore}/100
                <span className="ml-2 font-semibold">({item.decision})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="dash-bento p-6 bg-white dark:bg-gray-800">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
