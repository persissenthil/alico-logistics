"use client";

import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly will I receive my quote?",
    answer:
      "Most quote requests are reviewed within 30 minutes during business hours. Complex shipments may take slightly longer.",
  },
  {
    question: "Is the quote completely free?",
    answer:
      "Yes. Every freight quote is completely free with no obligation to book a shipment.",
  },
  {
    question: "Can I request international shipping?",
    answer:
      "Absolutely. We provide air, sea, road, and multimodal freight services across more than 120 countries.",
  },
  {
    question: "What information do I need?",
    answer:
      "Destination, pickup location, shipment type, cargo dimensions or weight, and preferred shipping method are enough to get started.",
  },
  {
    question: "Can you handle customs clearance?",
    answer:
      "Yes. Our logistics specialists manage customs documentation and clearance for international shipments.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Frequently Asked Questions
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Have Questions?
          </h2>

          <p className="text-gray-600 mt-5">
            Everything you need to know before requesting your freight quote.
          </p>
        </div>

        <div className="space-y-6">

          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-xl font-semibold">
                  {faq.question}
                </h3>

                <ChevronDown className="group-open:rotate-180 transition duration-300" />
              </summary>

              <p className="mt-5 text-gray-600 leading-7">
                {faq.answer}
              </p>
            </details>
          ))}

        </div>
      </div>
    </section>
  );
}