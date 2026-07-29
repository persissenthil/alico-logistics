"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "Operations Manager",
    text: "Alico Logistics has transformed our supply chain. Their service is reliable, fast, and professional.",
  },
  {
    name: "Sarah Wilson",
    role: "Import Manager",
    text: "We have worked with Alico for years. Every shipment arrives on time with excellent customer support.",
  },
  {
    name: "Michael Brown",
    role: "CEO",
    text: "Highly recommended! Their logistics expertise has helped our business expand internationally.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Our Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trusted by businesses around the world for reliable logistics,
            secure transportation, and outstanding customer service.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="text-blue-600 mb-6" size={40} />

              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 leading-7 mb-8">
                "{item.text}"
              </p>

              <h3 className="text-xl font-semibold">
                {item.name}
              </h3>

              <p className="text-gray-500">
                {item.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}