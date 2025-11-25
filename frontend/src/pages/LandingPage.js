import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll(".magic-bento");

    const mouseMoveHandlers = [];

    cards.forEach(card => {
      const handler = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      };

      card.addEventListener('mousemove', handler);
      mouseMoveHandlers.push({ card, handler });
    });

    return () => {
      mouseMoveHandlers.forEach(({ card, handler }) => {
        card.removeEventListener('mousemove', handler);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white flex items-center justify-center overflow-hidden">

      <div className="text-center px-6 max-w-6xl">

        <h1 className="main-title text-5xl md:text-6xl font-bold mb-6">
          AI MORTGAGE SYSTEM
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-300">
          This AI platform automates mortgage underwriting by reading loan documents,
          analyzing borrower risk, generating summaries, and proposing smart conditions.
          It reduces manual effort, increases accuracy, and accelerates approval timelines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="magic-bento p-6 rounded-2xl backdrop-blur-xl bg-white/10">
            <img src="/Smart.jpg" alt="Smart Analysis" className="rounded-xl mb-4 w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
            <p className="text-sm text-gray-300">
              Our AI engine intelligently reads and interprets complete mortgage loan packages with high accuracy.
              It extracts borrower details, income data, credit metrics, and property information automatically.
              Complex documents are converted into clear, structured underwriting summaries in seconds.
              This eliminates manual data entry and significantly improves operational efficiency.
            </p>
          </div>

          <div className="magic-bento p-6 rounded-2xl backdrop-blur-xl bg-white/10">
            <img src="/Risk.jpg" alt="Risk Detection" className="rounded-xl mb-4 w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Risk Detection</h3>
            <p className="text-sm text-gray-300">
              The system continuously evaluates borrower profiles to identify potential financial risks.
              It detects inconsistencies, late payments, missing documentation, and compliance concerns.
              Advanced AI models analyze patterns to predict probability of default or instability.
              This ensures safer mortgage decisions with minimized exposure to financial loss.
            </p>
          </div>

          <div className="magic-bento p-6 rounded-2xl backdrop-blur-xl bg-white/10">
            <img src="/Faster.jpg" alt="Faster Decisions" className="rounded-xl mb-4 w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Faster Decisions</h3>
            <p className="text-sm text-gray-300">
              Automation drastically reduces underwriting turnaround time from hours to minutes.
              AI-driven insights help underwriters make confident decisions with supporting evidence.
              Loan approvals become faster, more consistent, and highly reliable.
              This accelerates lender workflows while maintaining strict accuracy and compliance standards.
            </p>
          </div>

        </div>

        {/* ✅ GUARANTEED NAVIGATION BUTTON */}
        <button
          type="button"
          onClick={() => {
            console.log("Navigating to dashboard...");
            navigate("/dashboard");
          }}
          className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full font-semibold text-lg shadow-xl transition hover:scale-105"
        >
          Go To Dashboard
        </button>
      </div>

      <style>{`
        .main-title {
          animation: smoothFloat 4s ease-in-out infinite;
        }

        @keyframes smoothFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .magic-bento:hover {
          transform: scale(1.04);
          transition: 0.3s ease;
        }
      `}</style>

    </div>
  );
}
