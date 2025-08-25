import { cookies } from "next/headers";

const cookieName = "token";

export function setAuthCookie(token: string) {
  cookies().set({
    name: cookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getAuthCookie() {
  return cookies().get(cookieName)?.value || null;
}

export function clearAuthCookie() {
  cookies().set({
    name: cookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
