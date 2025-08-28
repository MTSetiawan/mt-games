import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tema = searchParams.get("tema") || "";
  const difficulty = searchParams.get("difficulty") || "medium";

  const prompt = `
  Buatkan **tepat 5 soal quiz** tentang topik "${tema}".
  Tingkat kesulitan: ${difficulty}.
  Setiap soal WAJIB memiliki 4 opsi jawaban (opsi A, B, C, D).
  Hanya ada 1 jawaban benar.
  
  Format WAJIB berupa JSON array valid TANPA teks tambahan:
  [
    {
      "question": "Pertanyaan quiz?",
      "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
      "answer": "Opsi A"
    }
  ]
  `;

  try {
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: { prompt },
    });

    let raw = Array.isArray(output) ? output.join("") : String(output);
    console.log("🔍 Raw output:", raw);

    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("Tidak ada JSON valid di output");
    raw = match[0];

    raw = raw
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/"question"::/g, '"question":')
      .replace(/::/g, ":")
      .replace(/^\s*\d+\.\s*/gm, "");

    const objectMatches = raw.match(/\{[\s\S]*?\}/g);
    if (objectMatches) {
      raw = `[${objectMatches.join(",")}]`;
    }

    const questions = JSON.parse(raw);

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("⚠️ Gagal parse JSON:", err);
    return NextResponse.json(
      { questions: [], error: "Parsing gagal" },
      { status: 500 }
    );
  }
}
