"use client";
import Link from "next/link";
import { useState } from "react";

// Type untuk Game
type Game = {
  id: number;
  name: string;
  icon: string;
  description: string;
  difficulty: string;
  link: string;
};

// Type untuk Feature
type Feature = {
  icon: string;
  title: string;
  description: string;
};

const LandingPage: React.FC = () => {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  const games: Game[] = [
    {
      id: 1,
      name: "Quiz Games",
      icon: "🐍",
      description: "Quiz games on various topics",
      difficulty: "Easy | Medium | Hard",
      link: "/minigames/quiz",
    },
    {
      id: 2,
      name: "Tetris Blocks",
      icon: "🧩",
      description: "Addictive puzzle block game",
      difficulty: "Medium",
      link: "/minigames/tetris",
    },
  ];

  const features: Feature[] = [
    {
      icon: "⚡",
      title: "Instant Play",
      description: "No downloads required. Play directly in your browser",
    },
    {
      icon: "🏆",
      title: "Leaderboards",
      description: "Compete with players worldwide and climb the ranks",
    },
    {
      icon: "💎",
      title: "Free to Play",
      description: "All games are completely free with no hidden costs",
    },
  ];

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

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              MTGames
            </h1>
            <div className="flex items-center space-x-1 text-yellow-400 text-sm">
              <span>⭐</span>
              <span className="font-medium">Mini Games Hub</span>
              <span>⭐</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-2 text-white hover:text-purple-300 font-medium transition-colors">
              🎮 Games
            </button>
            <button className="px-6 py-2 text-white hover:text-purple-300 font-medium transition-colors">
              🏆 Leaderboard
            </button>
            <Link
              href="/minigames"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              🚀 Play Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to the Ultimate
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Gaming Experience
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Dive into our collection of addictive mini-games. Challenge
            yourself, compete with friends, and climb the global leaderboards in
            this epic gaming adventure!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/minigames"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-purple-500/30"
            >
              🎯 Start Playing Free
            </Link>
            <Link
              href="/minigames"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 text-white font-semibold rounded-xl hover:bg-slate-700/50 transform hover:scale-105 transition-all duration-200"
            >
              📊 View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              🎮 Featured Games
            </h3>
            <p className="text-gray-300 text-lg">
              Choose your favorite and start playing instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-200">
                    {game.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {game.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {game.description}
                  </p>

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        game.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : game.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {game.difficulty}
                    </span>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              ✨ Why Choose MTGames?
            </h3>
            <p className="text-gray-300 text-lg">
              The best gaming experience with amazing features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 text-center hover:border-purple-400/40 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 rounded-3xl p-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Gaming Journey?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players and discover your new favorite game
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/minigames"
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-purple-500/30"
              >
                🎯 Play Free Now
              </Link>
              <div className="text-gray-400 text-sm">
                Registration required • Instant play
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              MTGames
            </h1>
            <div className="flex items-center space-x-1 text-yellow-400 text-sm">
              <span>⭐</span>
              <span className="font-medium">Mini Games Hub</span>
              <span>⭐</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 MTGames. Ready to play amazing mini games? 🎮🎲
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
