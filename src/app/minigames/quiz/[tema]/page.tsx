/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0); // detik
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const tema = params.tema;
  const difficulty = searchParams.get("difficulty") || "medium";

  async function loadQuestions() {
    setLoading(true);
    setErr(null);
    setSubmitted(false);
    setCurrentIndex(0);

    try {
      const res = await fetch(
        `/api/quiz?tema=${tema}&difficulty=${difficulty}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      const raw: any[] = Array.isArray(data?.questions) ? data.questions : [];

      const sanitized: Question[] = raw
        .map((q, i) => {
          let opts: string[] = Array.isArray(q?.options)
            ? q.options
            : typeof q?.options === "string"
            ? q.options.split(",").map((s: string) => s.trim())
            : [];
          opts = opts.filter(Boolean).map(String);

          const question = String(q?.question ?? `Soal ${i + 1}`).trim();
          const answerRaw = String(q?.answer ?? "").trim();

          const normalized = (s: string) => s.trim().toLowerCase();
          const fixedAnswer =
            opts.find((o) => normalized(o) === normalized(answerRaw)) ??
            opts[0] ??
            "";

          return { question, options: opts, answer: fixedAnswer };
        })
        .filter((q) => q.question && q.options.length >= 2);

      if (sanitized.length === 0) throw new Error("Soal kosong/invalid");

      setQuestions(sanitized);
      setAnswers(Array(sanitized.length).fill(null));

      setTimeLeft(sanitized.length * 30);
    } catch (e: any) {
      console.error(e);
      setErr("Gagal mengambil soal, Silahkan refersh halaman.");
      setQuestions([]);
      setAnswers([]);
      setTimeLeft(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (submitted || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, submitted, questions.length]);

  const current = questions[currentIndex];
  const totalTime = questions.length * 30 || 1;
  const progress = Math.max(
    0,
    Math.min(100, Math.round((timeLeft / totalTime) * 100))
  );

  function pickOption(opt: string) {
    if (submitted) return;
    const next = answers.slice();
    next[currentIndex] = opt;
    setAnswers(next);
  }

  function prev() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  }

  function calculateScore() {
    const norm = (s: string) => s?.trim().toLowerCase();
    return answers.reduce((acc, ans, i) => {
      if (ans && questions[i] && norm(ans) === norm(questions[i].answer)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  async function handleSubmit() {
    const finalScore = calculateScore();
    setSubmitted(true);

    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game: "quiz",
          tema,
          difficulty,
          score: finalScore,
        }),
      });
      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  const score = useMemo(() => {
    if (!submitted) return 0;
    return calculateScore();
  }, [submitted, answers, questions]);

  // Get difficulty color
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  // Get timer color based on time left
  const getTimerColor = () => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 50) return "text-green-400";
    if (percentage > 25) return "text-yellow-400";
    return "text-red-400";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-5 w-1 h-1 bg-pink-300 rounded-full animate-pulse"></div>
        <div className="absolute top-10 right-10 text-2xl animate-bounce">
          🧠
        </div>
        <div
          className="absolute bottom-10 left-10 text-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🎯
        </div>
        <div className="absolute top-1/3 right-5 text-xl animate-pulse">💡</div>
        <div
          className="absolute bottom-1/3 left-5 text-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          ⚡
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                🧠 AI Quiz Challenge
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-300">
                  📚 Topic:{" "}
                  <span className="text-purple-300 font-medium capitalize">
                    {tema}
                  </span>
                </span>
                <span
                  className={`px-3 py-1 rounded-full border text-xs font-medium capitalize ${getDifficultyColor(
                    difficulty
                  )}`}
                >
                  {difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={loadQuestions}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </span>
              ) : questions.length ? (
                "🔄 New Questions"
              ) : (
                "🚀 Start Quiz"
              )}
            </button>
          </div>
        </div>

        {/* Progress & Timer */}
        {questions.length > 0 && !submitted && (
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">
                  📝 Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < currentIndex
                          ? "bg-green-400"
                          : i === currentIndex
                          ? "bg-purple-400"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div
                className={`flex items-center gap-2 font-bold text-lg ${getTimerColor()}`}
              >
                <span>⏱️</span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-3 transition-all duration-1000 ease-linear ${
                  progress > 50
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : progress > 25
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                    : "bg-gradient-to-r from-red-500 to-red-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {err && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-2xl p-6 mb-6 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span>{err}</span>
          </div>
        )}

        {/* Quiz Content */}
        {current && !submitted && (
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                <span className="text-2xl">❓</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Question {currentIndex + 1}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {current.question}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {current.options.map((opt, idx) => {
                const key = String.fromCharCode(65 + idx); // A/B/C/D...
                const chosen = answers[currentIndex] === opt;
                return (
                  <button
                    key={opt + idx}
                    onClick={() => pickOption(opt)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                      chosen
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-400 shadow-lg shadow-purple-500/25"
                        : "bg-slate-700/30 text-gray-300 border-slate-600/50 hover:bg-slate-600/50 hover:border-purple-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          chosen ? "bg-white/20" : "bg-purple-500/20"
                        }`}
                      >
                        {key}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {chosen && <span className="text-xl">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl bg-slate-700/50 text-white font-semibold border border-slate-600/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                <span>←</span>
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={next}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                >
                  Next
                  <span>→</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
                >
                  <span>🏆</span>
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {submitted && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Quiz Completed!
              </h2>
              <div className="text-6xl font-bold text-white mb-2">
                {score}
                <span className="text-2xl text-gray-400">
                  /{questions.length}
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                {score === questions.length
                  ? "Perfect Score! 🎉"
                  : score >= questions.length * 0.8
                  ? "Excellent Work! 🌟"
                  : score >= questions.length * 0.6
                  ? "Good Job! 👏"
                  : "Keep Practicing! 💪"}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                <span>📚 {tema}</span>
                <span>•</span>
                <span
                  className={`px-2 py-1 rounded-full border ${getDifficultyColor(
                    difficulty
                  )}`}
                >
                  {difficulty}
                </span>
                <span>•</span>
                <span>⭐ {Math.round((score / questions.length) * 100)}%</span>
              </div>
              <button
                onClick={loadQuestions}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                🚀 Play Again
              </button>
              <Link
                href="/minigames/quiz"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                🔙 Back to Topics
              </Link>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>📋</span>
                Review Answers
              </h3>
              <div className="space-y-4">
                {questions.map((q, i) => {
                  const user = answers[i];
                  const correct = q.answer;
                  const isCorrect =
                    user &&
                    user.trim().toLowerCase() === correct.trim().toLowerCase();
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border-2 ${
                        isCorrect
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-2xl ${isCorrect ? "✅" : "❌"}`}>
                          {isCorrect ? "✅" : "❌"}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-white mb-2">
                            {i + 1}. {q.question}
                          </p>
                          <div className="text-sm space-y-1">
                            <p
                              className={`${
                                isCorrect ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              Your answer:{" "}
                              <span className="font-medium">
                                {user || "(No answer)"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-green-400">
                                Correct answer:{" "}
                                <span className="font-medium">{correct}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!questions.length && !loading && !err && (
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-gray-300 mb-6">
              Click the button above to start your quiz adventure!
            </p>
            <div className="text-4xl">🚀</div>
          </div>
        )}
      </div>
    </div>
  );
}
