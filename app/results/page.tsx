"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function ResultsContent() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const scoreParam = searchParams.get("score");
    const totalParam = searchParams.get("total");

    if (scoreParam) setScore(parseInt(scoreParam));
    if (totalParam) setTotal(parseInt(totalParam));
  }, [searchParams]);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! Great job, Rumi Aktar! You Did It";
    if (percentage >= 60) return "Good job! Keep practicing to improve further";
    return "Keep studying and try again!";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-lg">
        {/* Score Circle */}
        <div className="relative mb-8">
          <div
            className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0F469A 0%, #407DD8 100%)",
            }}
          >
            <div className="text-white">
              <div className="text-lg font-semibold">Your Score</div>
              <div className="text-2xl font-bold">
                {score}/{total}
              </div>
            </div>
          </div>
        </div>

        {/* Congratulations */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {percentage >= 60 ? "Congratulation" : "Keep Trying!"}
        </h1>
        <p className={`text-lg mb-8 ${getScoreColor()}`}>{getScoreMessage()}</p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            className="w-full py-3 px-6 text-white rounded-lg font-medium"
            style={{ background: "#0F469A" }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My Quiz Score",
                  text: `I scored ${score}/${total} on the quiz!`,
                  url: window.location.href,
                });
              }
            }}
          >
            Share
          </button>

          <Link href="/">
            <button
              className="w-full py-3 px-6 text-white rounded-lg font-medium"
              style={{ background: "#0F469A" }}
            >
              Back to Home
            </button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{score}</div>
              <div className="text-sm text-gray-500">Correct</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {total - score}
              </div>
              <div className="text-sm text-gray-500">Wrong</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {percentage}%
              </div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
