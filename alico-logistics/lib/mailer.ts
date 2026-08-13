import { Resend } from "resend";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined.`);
  }

  return value;
}

const apiKey = getRequiredEnv("RESEND_API_KEY");
const fromEmail = getRequiredEnv("RESEND_FROM_EMAIL");

const resend = new Resend(apiKey);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [to],
    subject,
    html,
  });

  if (error) {
    throw new Error(
      error.message || "Unable to send email."
    );
  }

  return data;
}