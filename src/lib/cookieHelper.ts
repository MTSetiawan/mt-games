import { cookies } from "next/headers";

const cookieName = "token";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: cookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value || null;
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: cookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
