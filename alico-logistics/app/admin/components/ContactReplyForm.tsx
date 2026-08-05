"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ContactReplyFormProps = {
  contactId: number;
  customerName: string;
  originalSubject: string | null;
};

export default function ContactReplyForm({
  contactId,
  customerName,
  originalSubject,
}: ContactReplyFormProps) {
  const router = useRouter();

  const [subject, setSubject] = useState(
    originalSubject
      ? `Re: ${originalSubject}`
      : "Reply from Alico Logistics"
  );

  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/admin/contacts/${contactId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            reply,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send reply.");
      }

      setSuccessMessage(data.message);
      setReply("");

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-8 shadow">
      <h2 className="text-2xl font-semibold text-slate-900">
        Reply to {customerName}
      </h2>

      <p className="mt-2 text-slate-600">
        Send a response directly to the customer&apos;s email address.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="reply-subject"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email subject
          </label>

          <input
            id="reply-subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            maxLength={200}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="reply-message"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Reply message
          </label>

          <textarea
            id="reply-message"
            rows={8}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder="Write your reply here..."
            maxLength={5000}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {successMessage && (
          <p className="rounded-lg bg-green-100 px-4 py-3 text-green-700">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Reply"}
        </button>
      </form>
    </section>
  );
}