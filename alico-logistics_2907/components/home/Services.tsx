"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Plane,
  Ship,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Road Freight",
    description:
      "Reliable domestic and international road transportation.",
    icon: Truck,
  },
  {
    title: "Air Freight",
    description:
      "Fast and secure worldwide air cargo solutions.",
    icon: Plane,
  },
  {
    title: "Ocean Freight",
    description:
      "Cost-effective sea freight for global shipping.",
    icon: Ship,
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold uppercase tracking-[4px]">
            Our Services
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Logistics Solutions For Every Business
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We provide reliable transportation and supply chain
            solutions across road, air and sea freight.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Icon className="text-white" size={30} />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-8">
                  {service.description}
                </p>

                <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}