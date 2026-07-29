"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  {
    title: "Automotive",
    image: "/images/industry-automotive.jpg",
    description:
      "Reliable transportation of automotive parts and finished vehicles with precision and speed.",
  },
  {
    title: "Healthcare",
    image: "/images/industry-healthcare.jpg",
    description:
      "Safe and compliant logistics solutions for pharmaceuticals and medical equipment.",
  },
  {
    title: "Retail",
    image: "/images/industry-retail.jpg",
    description:
      "Flexible distribution networks that keep retail shelves stocked worldwide.",
  },
  {
    title: "Manufacturing",
    image: "/images/industry-manufacturing.jpg",
    description:
      "Efficient supply chain management for raw materials and finished products.",
  },
  {
    title: "Food & Beverage",
    image: "/images/industry-food.jpg",
    description:
      "Temperature-controlled logistics ensuring freshness and product safety.",
  },
  {
    title: "E-Commerce",
    image: "/images/industry-ecommerce.jpg",
    description:
      "Fast fulfillment and last-mile delivery solutions for online businesses.",
  },
  {
    title: "Technology",
    image: "/images/industry-technology.jpg",
    description:
      "Secure transportation for electronics, servers, and high-value equipment.",
  },
  {
    title: "Energy",
    image: "/images/industry-energy.jpg",
    description:
      "Specialized logistics support for energy, oil, gas, and renewable projects.",
  },
];

export default function IndustriesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Industries We Serve
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Tailored Logistics Solutions
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            We understand that every industry has unique logistics challenges.
            Our specialized solutions help businesses streamline supply chains,
            improve efficiency, and deliver with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-56">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">
                  {industry.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}