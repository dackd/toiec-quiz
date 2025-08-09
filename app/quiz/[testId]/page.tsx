"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Quiz, Question, UserAnswer } from "@/types/quiz";

interface QuizPageProps {
  params: {
    testId: string;
  };
}

interface PopupContent {
  type: "answerInfo" | "vocabulary" | null;
  data: string[] | null;
}

export default function QuizPage({ params }: QuizPageProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [popup, setPopup] = useState<PopupContent>({ type: null, data: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetch(`/test${params.testId}.json`);
        if (!response.ok) {
          throw new Error("Quiz not found");
        }
        const quizData = await response.json();
        setQuiz(quizData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading quiz:", error);
        setLoading(false);
      }
    };

    loadQuiz();
  }, [params.testId]);

  const currentQuestion: Question | null =
    quiz?.questions[currentQuestionIndex] || null;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect =
      !!currentQuestion && answer.startsWith(currentQuestion?.correctAnswer);
    const userAnswer: UserAnswer = {
      questionNumber: currentQuestion?.questionNumber || 0,
      selectedAnswer: answer,
      isCorrect,
    };

    setUserAnswers((prev) => [...prev, userAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      // Quiz completed, navigate to results
      const score = userAnswers.reduce(
        (acc, answer) => acc + (answer.isCorrect ? 1 : 0),
        0
      );
      const finalScore =
        selectedAnswer === currentQuestion?.correctAnswer ? score + 1 : score;
      router.push(
        `/results?testId=${params.testId}&score=${finalScore}&total=${quiz?.questions.length}`
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer("");
      setShowResult(false);
      // Remove the last answer from userAnswers
      setUserAnswers((prev) => prev.slice(0, -1));
    }
  };

  const openPopup = (type: "answerInfo" | "vocabulary") => {
    if (!currentQuestion) return;

    const data =
      type === "answerInfo"
        ? [...currentQuestion.answerInfo, ...currentQuestion.answerSelection]
        : currentQuestion.vocabulary;

    setPopup({ type, data });
  };

  const closePopup = () => {
    setPopup({ type: null, data: null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Quiz Not Found
          </h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
          <Link href="/" className="text-gray-600">
            ←
          </Link>
          <div className="text-center">
            <h1 className="font-semibold text-gray-900">{quiz.category}</h1>
            <p className="text-sm text-gray-500">
              {quiz.questions.length} Question
            </p>
          </div>
          <button className="text-gray-600">Quit</button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Question: {currentQuestionIndex + 1}/{quiz.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / quiz.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer.startsWith(currentQuestion.correctAnswer);
            const isWrong = showResult && isSelected && !isCorrect;
            const shouldHighlight = showResult && isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(answer)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border transition-all ${
                  shouldHighlight
                    ? "bg-green-100 border-green-500 text-green-800"
                    : isWrong
                    ? "bg-red-100 border-red-500 text-red-800"
                    : isSelected
                    ? "bg-blue-100 border-blue-500 text-blue-800"
                    : "bg-white border-gray-200 text-gray-900 hover:border-blue-300"
                }`}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => openPopup("answerInfo")}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
          >
            See Result
          </button>
          <button
            onClick={() => openPopup("vocabulary")}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
          >
            Vocabulary
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentQuestionIndex === 0
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-lg font-medium ${
              !selectedAnswer
                ? "bg-gray-200 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {currentQuestionIndex === quiz.questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>

      {/* Popup Overlay */}
      {popup.type && (
        <div
          className="fixed inset-0 bg-gray-100/40 bg-opacity-10 flex items-center justify-center z-50 p-4"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {popup.type === "answerInfo"
                  ? "Answer Information"
                  : "Vocabulary"}
              </h3>
              <button
                onClick={closePopup}
                className="text-gray-500 text-lg hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {popup.data?.map((item, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
