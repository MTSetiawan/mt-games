"use client";

import LoginForm from "@/component/Auth/LoginForm";
import RegisterForm from "@/component/Auth/RegisterForm";
import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-5 w-1 h-1 bg-pink-300 rounded-full animate-pulse"></div>
      </div>

      {/* Main auth container */}
      <div className="w-96 bg-slate-800/40 backdrop-blur-lg border border-purple-500/20 p-8 rounded-2xl shadow-2xl relative z-10">
        {/* Gaming-style header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            MTGames
          </h1>
          <div className="flex items-center justify-center space-x-1 text-yellow-400">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium">Mini Games Hub</span>
            <span className="text-lg">⭐</span>
          </div>
        </div>

        <div className="flex mb-6 bg-slate-900/50 rounded-lg p-1 border border-purple-500/20">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 p-3 text-center font-semibold rounded-md transition-all duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-[1.02]"
                : "text-gray-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            🎮 Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 p-3 text-center font-semibold rounded-md transition-all duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-[1.02]"
                : "text-gray-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            🚀 Register
          </button>
        </div>

        {/* Form content */}
        <div className="transition-all duration-300">
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitch={() => setIsLogin(true)} />
          )}
        </div>

        {/* Gaming footer */}
        <div className="mt-6 pt-4 border-t border-purple-500/20 text-center">
          <p className="text-xs text-gray-500">
            🎯 Ready to play amazing mini games? 🎲
          </p>
        </div>
      </div>

      <div className="absolute top-10 right-10 text-2xl animate-bounce">🎮</div>
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
    </main>
  );
};

export default AuthPage;
