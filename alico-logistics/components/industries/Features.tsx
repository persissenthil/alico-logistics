"use client";

import {
  Globe,
  ShieldCheck,
  Warehouse,
  Truck,
  Headphones,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Extensive worldwide logistics network connecting businesses across more than 120 countries.",
  },
  {
    icon: ShieldCheck,
    title: "Customs Expertise",
    description:
      "Experienced customs specialists ensuring fast, compliant, and hassle-free clearance.",
  },
  {
    icon: Warehouse,
    title: "Secure Warehousing",
    description:
      "Modern warehousing facilities with inventory management and real-time visibility.",
  },
  {
    icon: Truck,
    title: "Real-Time Tracking",
    description:
      "Monitor every shipment with advanced tracking and complete supply chain visibility.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Dedicated logistics professionals available around the clock to assist your business.",
  },
  {
    icon: Leaf,
    title: "Sustainable Logistics",
    description:
      "Environmentally responsible transportation solutions that reduce emissions and improve efficiency.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Why Industries Trust Alico Logistics
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            We combine global expertise, innovative technology, and customer-focused
            service to deliver logistics solutions that help businesses succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Icon className="text-white" size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}