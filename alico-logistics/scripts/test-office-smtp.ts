import "dotenv/config";
import nodemailer from "nodemailer";

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!user || !pass) {
  throw new Error("SMTP_USER and SMTP_PASS must be set in .env");
}

async function test(
  host: string,
  port: number,
  secure: boolean
) {
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.verify();

    console.log(`SUCCESS: ${host}:${port} secure=${secure}`);
  } catch (error) {
    console.log(`FAILED: ${host}:${port} secure=${secure}`);
    console.error(error);
  }
}

async function run() {
  await test("mail.alicoltd.co.uk", 465, true);
  await test("mail.alicoltd.co.uk", 587, false);
  await test("remitpro.pmnhost.net", 465, true);
  await test("remitpro.pmnhost.net", 587, false);
}

run();