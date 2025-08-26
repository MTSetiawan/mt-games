"use client";

import Link from "next/link";
import { useState } from "react";

const temaList = [
  {
    id: "sains",
    title: "Sains",
    desc: "Uji pengetahuanmu tentang dunia sains!",
    icon: "🔬",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "math",
    title: "Matematika",
    desc: "Tes kemampuan berhitung dan logika.",
    icon: "🔢",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "sejarah",
    title: "Sejarah",
    desc: "Seberapa baik kamu mengenal sejarah?",
    icon: "🏛️",
    color: "from-amber-600 to-orange-600",
  },
  {
    id: "teknologi",
    title: "Teknologi",
    desc: "Ikuti perkembangan dunia teknologi.",
    icon: "💻",
    color: "from-purple-600 to-violet-600",
  },
  {
    id: "film",
    title: "Film & Hiburan",
    desc: "Coba jawab pertanyaan seputar film & artis.",
    icon: "🎬",
    color: "from-pink-600 to-rose-600",
  },
];

export default function QuizMenu() {
  const [difficulty, setDifficulty] = useState("medium");

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

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case "easy":
        return "🟢";
      case "medium":
        return "🟡";
      case "hard":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
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
          ❓
        </div>
        <div className="absolute top-1/3 right-5 text-xl animate-pulse">💡</div>
        <div
          className="absolute bottom-1/3 left-5 text-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🎯
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🧠 Quiz Challenge
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Test your knowledge across different topics and challenge yourself!
          </p>

          {/* Difficulty Selector */}
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 max-w-md mx-auto">
            <label className="block text-white font-semibold mb-4 flex items-center justify-center gap-2">
              <span>⚙️</span>
              Choose Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                    difficulty === level
                      ? getDifficultyColor(level) +
                        " transform scale-105 shadow-lg"
                      : "bg-slate-700/30 text-gray-400 border-slate-600/50 hover:bg-slate-600/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{getDifficultyIcon(level)}</span>
                    <span className="text-sm capitalize">{level}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getDifficultyColor(
                  difficulty
                )}`}
              >
                Selected: {getDifficultyIcon(difficulty)}{" "}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {temaList.map((tema, index) => (
            <div
              key={tema.id}
              className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transform hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tema.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="text-center mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${tema.color} bg-opacity-20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-3xl">{tema.icon}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {tema.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {tema.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    className="block w-full"
                    href={`/minigames/quiz/${tema.id}?difficulty=${difficulty}`}
                  >
                    <button
                      className={`w-full py-3 px-4 bg-gradient-to-r ${tema.color} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-2xl`}
                    >
                      <span>🚀</span>
                      Start Quiz
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400/30 rounded-full group-hover:bg-purple-400/60 transition-colors"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400/30 rounded-full group-hover:bg-pink-400/60 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-white">
              {temaList.length}
            </div>
            <div className="text-gray-400 text-sm">Topics Available</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-gray-400 text-sm">Difficulty Levels</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-gray-400 text-sm">Powered Questions</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-2xl text-center">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-center gap-2">
              <span>💡</span>
              How to Play
            </h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>1. Choose your preferred difficulty level</p>
              <p>2. Select a topic that interests you</p>
              <p>3. Answer questions within the time limit</p>
              <p>4. Get your score and challenge your friends!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
