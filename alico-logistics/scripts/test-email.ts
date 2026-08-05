import "dotenv/config";
import { transporter } from "../lib/mailer";

async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log("SMTP connection and authentication succeeded.");
  } catch (error) {
    console.error("SMTP verification failed:", error);
  }
}

testEmailConnection();