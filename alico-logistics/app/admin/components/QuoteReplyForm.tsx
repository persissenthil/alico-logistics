"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QuoteReplyFormProps = {
  quoteId: number;
  customerName: string;
  originalSubject: string;
};

export default function QuoteReplyForm({
  quoteId,
  customerName,
  originalSubject,
}: QuoteReplyFormProps) {
  const router = useRouter();

  const [subject, setSubject] = useState(
    `Re: ${originalSubject}`
  );
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!subject.trim() || !reply.trim()) {
      setMessage(
        "Subject and reply message are required."
      );
      return;
    }

    setSending(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/quotes/${quoteId}/reply`,
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
        throw new Error(
          data.message || "Unable to send reply."
        );
      }

      setMessage("Reply sent successfully.");
      setReply("");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send reply."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl bg-white p-8 shadow"
    >
      <h2 className="text-2xl font-semibold text-slate-900">
        Reply to {customerName}
      </h2>

      <p className="mt-2 text-slate-600">
        Send a response directly to the customer's email address.
      </p>

      <div className="mt-6">
        <label
          htmlFor="quoteReplySubject"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email subject
        </label>

        <input
          id="quoteReplySubject"
          type="text"
          value={subject}
          onChange={(event) =>
            setSubject(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="quoteReplyMessage"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Reply message
        </label>

        <textarea
          id="quoteReplyMessage"
          rows={7}
          value={reply}
          onChange={(event) =>
            setReply(event.target.value)
          }
          placeholder="Write your reply here..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {message && (
        <div
          className={`mt-5 rounded-lg px-4 py-3 text-sm ${
            message === "Reply sent successfully."
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "Sending..." : "Send Reply"}
      </button>
    </form>
  );
}