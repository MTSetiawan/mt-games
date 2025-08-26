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

  try {
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: { prompt },
    });

    // Gabungkan output jadi string utuh
    let raw = Array.isArray(output) ? output.join("") : String(output);

    // Ambil isi array JSON dari [ ... ] paling luar
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("Tidak ada JSON valid di output");
    raw = match[0];

    // Hapus koma trailing (`,]` atau `,}`)
    raw = raw.replace(/,\s*([}\]])/g, "$1");

    // Parse JSON langsung
    const questions = JSON.parse(raw);

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
