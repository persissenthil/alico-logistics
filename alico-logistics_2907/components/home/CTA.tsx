"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to Move Your Cargo?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-200 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you need air freight, ocean shipping, road transport,
          warehousing, or customs clearance, our logistics experts are ready
          to deliver reliable solutions for your business.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/quote"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
          >
            Request Quote
          </Link>

          <Link
            href="/contact"
            className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}