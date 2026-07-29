"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="bg-blue-700 py-24">
      <div className="max-w-5xl mx-auto px-6 text-center text-white">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Ready to Optimize Your Supply Chain?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto"
        >
          Partner with Alico Logistics for reliable freight forwarding,
          warehousing, customs clearance, and end-to-end supply chain
          solutions tailored to your industry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link
            href="/quote"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Request a Quote
          </Link>

          <Link
            href="/contact"
            className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Contact Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
}