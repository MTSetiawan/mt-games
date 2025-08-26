import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "required fill" });
    }
    const supabase = supabaseServer();

    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Email already used" },
        { status: 400 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: "Email already used" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }])
      .select("id,name,email")
      .single();

    if (error) throw error;

    return NextResponse.json({ user: data });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
