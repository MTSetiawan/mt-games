import { sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;
console.log({ secret });

export type JWTPayload = {
  sub: string;
  email: string;
  name?: string | null;
};
export function signJwt(payload: JWTPayload) {
  return sign(payload, secret, { expiresIn: "7d" });
}

export function verifyJwt<T = JWTPayload>(token: string): T | null {
  try {
    return verify(token, secret) as T;
  } catch {
    return null;
  }
}
