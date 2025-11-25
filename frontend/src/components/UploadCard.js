import { useState } from "react";

export default function UploadCard() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://ai-mortgage-assistant.onrender.com/analyze-loan/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.result);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">Upload Loan Document</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze Loan
      </button>
    </div>
  );
}
