"use client";

import { FormEvent, useState } from "react";

type QuoteFormData = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  origin: string;
  destination: string;
  service: string;
  cargoType: string;
  weight: string;
  message: string;
};

const initialFormData: QuoteFormData = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  origin: "",
  destination: "",
  service: "",
  cargoType: "",
  weight: "",
  message: "",
};

export default function QuoteForm() {
  const [formData, setFormData] =
    useState<QuoteFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit quote request.");
      }

      setSuccessMessage(data.message);
      setFormData(initialFormData);
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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-[5px] text-blue-600">
            Get Your Quote
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Request Freight Pricing
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Complete the form below and our logistics specialists will
            provide a customized quotation based on your shipment
            requirements.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-10 shadow-xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Origin"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="rounded-lg border px-5 py-4"
            >
              <option value="">Select Freight Service</option>
              <option value="Air Freight">Air Freight</option>
              <option value="Sea Freight">Sea Freight</option>
              <option value="Road Transport">Road Transport</option>
              <option value="Rail Freight">Rail Freight</option>
            </select>

            <input
              type="text"
              name="cargoType"
              value={formData.cargoType}
              onChange={handleChange}
              placeholder="Cargo Type"
              required
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Cargo Weight"
              className="rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2"
            />
          </div>

          <textarea
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Shipment Details"
            className="mt-6 w-full rounded-lg border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {successMessage && (
            <p className="mt-6 rounded-lg bg-green-100 p-4 text-green-700">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 rounded-lg bg-blue-600 px-10 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Request Quote"}
          </button>
        </form>
      </div>
    </section>
  );
}