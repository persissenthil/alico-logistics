import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not defined.");
}

const encodedSecret = new TextEncoder().encode(secret);

export async function createSessionToken(adminId: number) {
  return new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedSecret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, encodedSecret);

  return payload;
}