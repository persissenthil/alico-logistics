"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What logistics services do you provide?",
    answer:
      "We provide road freight, air freight, ocean freight, warehousing, customs clearance, and end-to-end supply chain management.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes. We offer reliable international shipping services across North America, Europe, Asia, the Middle East, and Africa.",
  },
  {
    question: "How can I request a freight quote?",
    answer:
      "Simply click the 'Request Quote' button or visit our Contact page to submit your shipment details.",
  },
  {
    question: "Can you handle customs clearance?",
    answer:
      "Yes. Our experienced customs specialists ensure your shipments comply with import and export regulations.",
  },
  {
    question: "How can I track my shipment?",
    answer:
      "After booking, you'll receive shipment updates and tracking information from our logistics team.",
  },
];
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-blue-600 font-semibold">
            Frequently Asked Questions
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Got Questions?
          </h2>

          <p className="text-gray-600 mt-4">
            Find answers to the most common questions about our logistics
            services.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {open === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-blue-600" />
                )}
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
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