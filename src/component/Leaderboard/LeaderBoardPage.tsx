"use client";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  user_id: string;
  name: string;
  total_score: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const data = await res.json();
        setLeaders(data.leaderboard);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-slate-900 rounded-2xl shadow-xl border border-purple-500/30">
      <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">
        🏆 Leaderboard
      </h2>
      <ul className="divide-y divide-slate-700">
        {leaders.map((player, index) => (
          <li
            key={player.user_id}
            className="flex items-center justify-between py-3 px-2 hover:bg-slate-800/50 rounded-lg transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-pink-400 w-6 text-center">
                {index + 1}
              </span>
              <span className="text-white font-medium">{player.name}</span>
            </div>
            <span className="text-yellow-400 font-semibold">
              {player.total_score} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
