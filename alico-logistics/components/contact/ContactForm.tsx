"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    alert("Message submitted successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Send Us a Message
          </h2>

          <p className="text-gray-600 mt-4">
            Fill in the form below and our logistics experts will contact you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg p-4 w-full"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg p-4 w-full"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border rounded-lg p-4 w-full"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="border rounded-lg p-4 w-full"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className="border rounded-lg p-4 w-full"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}