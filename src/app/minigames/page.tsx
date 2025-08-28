"use client";
import Link from "next/link";
import React, { useState } from "react";

const MiniGamesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const games = [
    {
      id: 1,
      name: "Quiz Games",
      icon: "📖",
      category: "Quiz",
      difficulty: "Easy | Medium | Hard",
      description: "quiz game with multiple categories and difficulty levels",
      featured: true,
      tags: ["quiz", "games", "fun"],
      link: "/minigames/quiz",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet.",
      icon: "🧩",
      category: "Lorem ipsum dolor sit amet.",
      difficulty: "Medium",
      description: "Lorem ipsum dolor sit amet.",
      featured: true,
      tags: ["lorem", "ipsum"],
      link: "/minigames",
    },
  ];

  const filteredGames = games.filter((game) => {
    const matchesCategory =
      selectedCategory === "all" || game.category === selectedCategory;
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
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
          🎮
        </div>
        <div
          className="absolute bottom-10 left-10 text-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🎲
        </div>
        <div className="absolute top-1/3 right-5 text-xl animate-pulse">🏆</div>
        <div
          className="absolute bottom-1/3 left-5 text-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          ⚡
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🎮 Mini Games
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose from our collection of amazing mini games and start playing
            instantly!
          </p>

          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="🔍 Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {game.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex justify-center mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(
                      game.difficulty
                    )}`}
                  >
                    {game.difficulty}
                  </span>
                </div>

                <Link href={game.link}>
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-sm">
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No games found
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or selecting a different category
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
            >
              Show All Games
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🎮</div>
          <div className="text-2xl font-bold text-white">{games.length}</div>
          <div className="text-gray-400 text-sm">Total Games</div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-white">12345</div>
          <div className="text-gray-400 text-sm">Active Players</div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-white">⭐</div>
          <div className="text-gray-400 text-sm">Average Rating</div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-white">Free</div>
          <div className="text-gray-400 text-sm">All Games</div>
        </div>
      </div>
    </div>
  );
};

export default MiniGamesPage;
