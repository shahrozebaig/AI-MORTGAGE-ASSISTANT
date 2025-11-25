export default function SummaryCard({ result }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-2">Underwriting Summary</h2>
      <pre className="text-sm whitespace-pre-wrap text-gray-700">
        {result || "AI summary will appear here..."}
      </pre>
    </div>
  );
}
