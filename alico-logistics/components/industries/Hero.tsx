"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">

              <Image
                src="/images/about.jpg"
                alt="About Alico Logistics"
                width={700}
                height={700}
                className="rounded-2xl"
              />

              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-5xl font-bold">25+</h3>
                <p className="mt-2">Years Experience</p>
              </div>

            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <p className="uppercase tracking-[4px] text-blue-600 font-semibold">
              About Company
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Trusted Logistics Partner Worldwide
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Alico Logistics delivers complete freight forwarding,
              customs clearance, warehousing and supply chain
              solutions with reliability, speed and professionalism.
            </p>

            <div className="space-y-5 mt-8">

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                <span>Worldwide Freight Network</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                <span>Experienced Logistics Experts</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />
                <span>Fast & Secure Delivery</span>
              </div>

            </div>

            <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition">
              Learn More
            </button>

          </motion.div>

        </div>

      </div>
    </section>
  );
}