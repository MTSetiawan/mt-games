import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/cookieHelper";

export async function POST() {
  clearAuthCookie();
  return NextResponse.json({ ok: true });
}
