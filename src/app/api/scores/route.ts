import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;
    const user = token ? verifyJwt(token) : null;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { game, tema, difficulty, score } = await req.json();

    if (!game || !tema || !difficulty || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid req body" }, { status: 400 });
    }

    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("scores")
      .insert([
        {
          user_id: user.sub,
          game,
          tema,
          difficulty,
          score,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ succes: true, score: data[0] });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
