"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What logistics services do you provide?",
    answer:
      "We offer road freight, air freight, ocean freight, warehousing, customs clearance, and complete supply chain solutions.",
  },
  {
    question: "Do you provide international shipping?",
    answer:
      "Yes. We provide reliable international logistics solutions across multiple countries through our global partner network.",
  },
  {
    question: "Can you handle customs clearance?",
    answer:
      "Absolutely. Our experienced customs specialists manage all required documentation and compliance procedures.",
  },
  {
    question: "Do you offer warehousing services?",
    answer:
      "Yes. We provide secure warehousing, inventory management, and distribution solutions for businesses of all sizes.",
  },
  {
    question: "How can I request a logistics quote?",
    answer:
      "Simply use our Request Quote page or contact our logistics team. We will prepare a customized quotation based on your shipment requirements.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-blue-600 font-semibold mb-4">
            FAQ
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-slate-600">
            Answers to common questions about our logistics services.
          </p>
        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-slate-600 leading-8">
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