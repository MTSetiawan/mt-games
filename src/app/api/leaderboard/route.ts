import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("total_score", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ leaderboard: data });
  } catch (errror) {
    console.error("error", errror);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
