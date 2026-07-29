"use client";

import { motion } from "framer-motion";

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export default function Hero({
  title,
  subtitle,
  image,
}: HeroProps) {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
         backgroundImage: `url('${image}')`,
      // backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            className="max-w-3xl text-white"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="uppercase tracking-[5px] text-blue-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Global Freight Forwarding
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-10 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
              >
                Request Quote
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition"
              >
                Our Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}