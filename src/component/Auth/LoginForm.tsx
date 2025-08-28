"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  onSwitch: () => void;
}

const LoginForm = ({ onSwitch }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    router.replace("/minigames");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
      >
        Start Playing
      </button>

      <p className="text-center text-sm text-gray-400">
        New player?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          Create Account
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
