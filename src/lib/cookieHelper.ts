import { cookies } from "next/headers";

const cookieName = "token";

export async function setAuthCookie(token: string) {
  (await cookies()).set({
    name: cookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getAuthCookie() {
  const cookieJar = await cookies();
  return cookieJar.get(cookieName)?.value || null;
}

export async function clearAuthCookie() {
  (await cookies()).set({
    name: cookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
