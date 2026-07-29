"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "Our team typically responds to all inquiries within one business day.",
  },
  {
    question: "Can I request a custom logistics solution?",
    answer:
      "Yes. We provide customized freight, warehousing, and supply chain solutions tailored to your business needs.",
  },
  {
    question: "Do you provide international shipping?",
    answer:
      "Absolutely. We manage air freight, sea freight, road transport, and customs clearance worldwide.",
  },
  {
    question: "How can I get a shipping quote?",
    answer:
      "Simply fill out our Quote Request form, and our logistics specialists will contact you with a personalized quotation.",
  },
];

export default function ContactFAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mt-4">
            Answers to some of the most common questions from our clients.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {active === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}