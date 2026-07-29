"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  {
    title: "Automotive",
    image: "/images/automotive.jpg",
  },
  {
    title: "Healthcare",
    image: "/images/healthcare.jpg",
  },
  {
    title: "Retail",
    image: "/images/retail.jpg",
  },
  {
    title: "Manufacturing",
    image: "/images/manufacturing.jpg",
  },
];

export default function Industries() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Industries We Serve
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Logistics Solutions Across Every Industry
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            From manufacturing to healthcare, retail, and automotive,
            Alico delivers reliable logistics solutions tailored to every
            industry's unique transportation needs.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={industry.image}
                alt={industry.title}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold">
                  {industry.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  Reliable logistics solutions designed for the{" "}
                  {industry.title.toLowerCase()} industry.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}