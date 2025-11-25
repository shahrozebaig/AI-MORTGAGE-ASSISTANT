import { useState } from "react";
import Topbar from "../components/Topbar";

function computeRiskScore(text) {
  if (!text) return 0;
  const t = text.toLowerCase();
  let score = 50;

  if (t.includes("high risk") || t.includes("late payment") || t.includes("delinquent")) score = 85;
  else if (t.includes("low risk") || t.includes("strong profile") || t.includes("excellent")) score = 20;
  else if (t.includes("moderate") || t.includes("some risk")) score = 60;

  return Math.min(100, Math.max(0, score));
}

function getDecision(score) {
  if (score <= 40) return "Approved";
  if (score <= 70) return "Needs Review";
  return "Rejected";
}

function extractSections(text) {
  const summaryMatch = text.match(/Summary:(.*?)(Risks:|Conditions:|$)/s);
  const risksMatch = text.match(/Risks:(.*?)(Conditions:|$)/s);
  const conditionsMatch = text.match(/Conditions:(.*)/s);

  return {
    summary: summaryMatch ? summaryMatch[1].trim() : text,
    risks: risksMatch ? risksMatch[1].trim() : "No significant risks detected.",
    conditions: conditionsMatch ? conditionsMatch[1].trim() : "No special conditions required."
  };
}

export default function UploadLoan() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [riskScore, setRiskScore] = useState(null);
  const [decision, setDecision] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    setLoading(true);
    setResult("");
    setRiskScore(null);
    setDecision("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://ai-mortgage-assistant.onrender.com/analyze-loan/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const text = data.result || "";

      setResult(text);

      const score = computeRiskScore(text);
      const dec = getDecision(score);
      const sections = extractSections(text);

      setRiskScore(score);
      setDecision(dec);

      const localPreviewURL = URL.createObjectURL(file);

      const history = JSON.parse(localStorage.getItem("loanHistory") || "[]");

      history.unshift({
        id: Date.now(),
        fileName: file.name,
        filePath: localPreviewURL,
        riskScore: score,
        decision: dec,
        summary: sections.summary,
        risks: sections.risks,
        conditions: sections.conditions,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("loanHistory", JSON.stringify(history));

    } catch (err) {
      console.error(err);
      alert("Error analyzing loan");
    }

    setLoading(false);
  };

  const riskColor =
    riskScore > 70 ? "bg-red-500" :
    riskScore > 40 ? "bg-yellow-400" :
    "bg-green-500";

  const badgeClasses =
    decision === "Approved"
      ? "bg-green-100 text-green-700"
      : decision === "Needs Review"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div>
      <Topbar title="Upload Loan" />

      <div className="bg-white dark:bg-gray-800 p-6 mb-6 rounded-lg shadow">
        <h2 className="font-semibold mb-3">Upload Loan Document</h2>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          onClick={handleUpload}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Analyze
        </button>

        {loading && (
          <p className="mt-3 text-blue-500 animate-pulse">
            AI is analyzing the loan document...
          </p>
        )}

        {decision && (
          <div className="mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses}`}>
              {decision}
            </span>
          </div>
        )}

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Risk Score</span>
            <span>{riskScore ?? "--"}/100</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-3 ${riskColor}`}
              style={{ width: `${riskScore || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Underwriting Summary</h2>
        <pre className="whitespace-pre-wrap text-sm">
          {result || "AI underwriting summary will appear here after analysis."}
        </pre>
      </div>
    </div>
  );
}
