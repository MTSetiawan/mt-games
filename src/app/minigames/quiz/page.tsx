"use client";

import Link from "next/link";
import { useState } from "react";

const temaList = [
  {
    id: "sains",
    title: "Sains",
    desc: "Uji pengetahuanmu tentang dunia sains!",
  },
  {
    id: "math",
    title: "Matematika",
    desc: "Tes kemampuan berhitung dan logika.",
  },
  {
    id: "sejarah",
    title: "Sejarah",
    desc: "Seberapa baik kamu mengenal sejarah?",
  },
  {
    id: "teknologi",
    title: "Teknologi",
    desc: "Ikuti perkembangan dunia teknologi.",
  },
  {
    id: "film",
    title: "Film & Hiburan",
    desc: "Coba jawab pertanyaan seputar film & artis.",
  },
];

export default function QuizMenu() {
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pilih Tema & Tingkat Kesulitan
      </h1>

      {/* Selector tingkat kesulitan */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Kesulitan:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="easy">Mudah</option>
          <option value="medium">Sedang</option>
          <option value="hard">Sulit</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
        {temaList.map((tema) => (
          <div
            key={tema.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{tema.title}</h2>
            <p className="text-gray-600 mb-4">{tema.desc}</p>
            <Link
              className="w-32"
              href={`/quiz/${tema.id}?difficulty=${difficulty}`}
            >
              <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full cursor-pointer">
                Mulai Quiz
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
