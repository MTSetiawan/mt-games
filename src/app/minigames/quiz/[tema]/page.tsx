"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string; // jawaban benar (harus salah satu dari options)
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
  const tema = params.tema; // dari dynamic route [tema]
  const difficulty = searchParams.get("difficulty") || "medium";

  // Ambil soal dari API
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
      console.log({ data });

      // Ambil array questions dari API
      const raw: any[] = Array.isArray(data?.questions) ? data.questions : [];

      // Sanitasi bentuk data (AI kadang nakal 😅)
      const sanitized: Question[] = raw
        .map((q, i) => {
          // pastikan options = string[]
          let opts: string[] = Array.isArray(q?.options)
            ? q.options
            : typeof q?.options === "string"
            ? q.options.split(",").map((s: string) => s.trim())
            : [];
          opts = opts.filter(Boolean).map(String);

          const question = String(q?.question ?? `Soal ${i + 1}`).trim();
          const answerRaw = String(q?.answer ?? "").trim();

          // pastikan answer ada di options (bandingkan case-insensitive)
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

      // Timer: 30 detik per soal (silakan ubah sesuai selera)
      setTimeLeft(sanitized.length * 30);
    } catch (e: any) {
      console.error(e);
      setErr("Gagal mengambil/parse soal dari API.");
      setQuestions([]);
      setAnswers([]);
      setTimeLeft(0);
    } finally {
      setLoading(false);
    }
  }

  // Timer global
  useEffect(() => {
    if (submitted || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit saat habis
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, submitted, questions.length]);

  // Navigasi & pilih jawaban
  const current = questions[currentIndex];
  const totalTime = questions.length * 30 || 1;
  const progress = Math.max(
    0,
    Math.min(100, Math.round((timeLeft / totalTime) * 100))
  );

  function pickOption(opt: string) {
    if (submitted) return; // setelah submit tidak bisa ubah
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

  function handleSubmit() {
    setSubmitted(true);
  }

  const score = useMemo(() => {
    if (!submitted) return 0;
    const norm = (s: string) => s?.trim().toLowerCase();
    return answers.reduce((acc, ans, i) => {
      if (ans && questions[i] && norm(ans) === norm(questions[i].answer))
        return acc + 1;
      return acc;
    }, 0);
  }, [submitted, answers, questions]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Quiz Game</h1>
        <button
          onClick={loadQuestions}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-60"
        >
          {loading
            ? "Loading..."
            : questions.length
            ? "Reload Soal"
            : "Get Questions"}
        </button>
      </div>

      {/* Info & Timer */}
      {questions.length > 0 && !submitted && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span>
              Soal {currentIndex + 1} / {questions.length}
            </span>
            <span className="font-semibold text-red-600">⏱ {timeLeft}s</span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-500"
              style={{ width: `${progress}%`, transition: "width 0.5s linear" }}
            />
          </div>
        </>
      )}

      {err && <p className="mt-4 text-red-600">{err}</p>}

      {/* Tampilan Quiz */}
      {current && !submitted && (
        <div className="mt-6 p-4 border rounded-2xl shadow">
          <p className="font-medium mb-4">
            {currentIndex + 1}. {current.question}
          </p>

          <div className="space-y-2">
            {current.options.map((opt, idx) => {
              const key = String.fromCharCode(65 + idx); // A/B/C/D...
              const chosen = answers[currentIndex] === opt;
              return (
                <button
                  key={opt + idx}
                  onClick={() => pickOption(opt)}
                  className={`w-full text-left px-4 py-2 rounded-xl border
                    ${chosen ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                >
                  {key}. {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border disabled:opacity-50"
            >
              Sebelumnya
            </button>

            {/* Submit hanya di soal terakhir */}
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={next}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl bg-green-600 text-white"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hasil */}
      {submitted && (
        <div className="mt-8 p-6 border rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-2">Hasil</h2>
          <p className="mb-4">
            Skor kamu: <span className="font-semibold">{score}</span> /{" "}
            {questions.length}
          </p>

          {/* Review ringkas */}
          <div className="space-y-4">
            {questions.map((q, i) => {
              const user = answers[i];
              const correct = q.answer;
              const isCorrect =
                user &&
                user.trim().toLowerCase() === correct.trim().toLowerCase();
              return (
                <div key={i} className="p-3 rounded-xl border">
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <p
                    className={`${
                      isCorrect ? "text-green-600" : "text-red-600"
                    } mt-1`}
                  >
                    {isCorrect ? "Benar" : "Salah"} — Jawaban kamu:{" "}
                    {user ?? "(kosong)"} | Kunci: {correct}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <button
              onClick={loadQuestions}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            >
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
