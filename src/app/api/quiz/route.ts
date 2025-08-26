import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tema = searchParams.get("tema") || "";
  const difficulty = searchParams.get("difficulty") || "medium"; // default medium

  console.log({ tema });

  const prompt = `
  Buatkan 5 soal quiz tentang ${tema} dengan tingkat kesulitan ${difficulty}.
  Format harus seperti ini:
  [
    {
      "question": "pertanyaan?",
      "options": ["opsi1", "opsi2", "opsi3", "opsi4"],
      "answer": "opsi yang benar"
    }
  ]
  Jangan sertakan teks lain, hanya JSON saja.
  `;

  const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
    input: { prompt },
  });

  let questions = [];
  try {
    let raw = Array.isArray(output) ? output.join("") : String(output);

    // ambil hanya isi array JSON
    const match = raw.match(/\[([^\]]|\n)*\]/);
    if (!match) throw new Error("Tidak ada JSON valid di output");
    raw = match[0];

    // hapus koma sebelum ] atau }
    raw = raw.replace(/,\s*([}\]])/g, "$1");

    // perbaikan "options": "a, b, c" jadi array
    raw = raw.replace(/"options":\s*"(.*?)"/g, (match, p1) => {
      const arr = p1.split(",").map((s: string) => `"${s.trim()}"`);
      return `"options": [${arr.join(", ")}]`;
    });

    questions = JSON.parse(raw);
    console.log({ questions });

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("Gagal parse JSON:", err);
    return NextResponse.json(
      { questions: [], error: "Parsing gagal" },
      { status: 500 }
    );
  }
}
