import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";

export default function Reports() {
  const [history, setHistory] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loanHistory") || "[]");
    setHistory(data);
  }, []);

  const filteredHistory =
    filter === "All" ? history : history.filter(l => l.decision === filter);

  const saveHistory = (updated) => {
    localStorage.setItem("loanHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const deleteLoan = (id) => {
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
    setSelectedLoan(null);
  };

  const exportPDF = () => {
    window.print();
  };

  // ✅ MANUAL DECISION UPDATE
  const updateDecision = (id, newDecision) => {
    const updated = history.map(item =>
      item.id === id ? { ...item, decision: newDecision } : item
    );
    saveHistory(updated);
    setSelectedLoan(updated.find(l => l.id === id));
  };

  return (
    <div>
      <Topbar title="Loan Reports" />

      {/* FILTER TABS */}
      <div className="flex gap-3 mt-4 mb-4">
        {["All", "Approved", "Needs Review", "Rejected"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
            ${filter === type
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">

        {filteredHistory.length === 0 ? (
          <p className="text-gray-500">No loans found.</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">File Name</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3">Decision</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map(item => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedLoan(item)}
                >
                  <td className="py-2 px-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-medium">
                    {item.fileName}
                  </td>
                  <td className="py-2 px-3 font-semibold">
                    {item.riskScore}
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${item.decision === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.decision === "Needs Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"}`}>
                      {item.decision}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DETAIL PANEL */}
      {selectedLoan && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{selectedLoan.fileName}</h2>

            <div className="flex gap-3">
              <button
                onClick={exportPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Export PDF
              </button>

              <button
                onClick={() => deleteLoan(selectedLoan.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          {/* ✅ MANUAL APPROVE / REJECT CONTROLS */}
          {selectedLoan.decision === "Needs Review" && (
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => updateDecision(selectedLoan.id, "Approved")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ✅ Approve
              </button>

              <button
                onClick={() => updateDecision(selectedLoan.id, "Rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                ❌ Reject
              </button>
            </div>
          )}

          <div>
            <p><strong>Risk Score:</strong> {selectedLoan.riskScore}</p>
            <p><strong>Decision:</strong> {selectedLoan.decision}</p>

            <h3 className="font-semibold mt-4">Summary</h3>
            <p className="text-sm whitespace-pre-wrap">{selectedLoan.summary}</p>

            <h3 className="font-semibold mt-4">Risks</h3>
            <p className="text-sm whitespace-pre-wrap">{selectedLoan.risks}</p>

            <h3 className="font-semibold mt-4">Conditions</h3>
            <p className="text-sm whitespace-pre-wrap">{selectedLoan.conditions}</p>
          </div>

        </div>
      )}
    </div>
  );
}
