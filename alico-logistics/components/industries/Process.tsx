"use client";

import {
  ClipboardCheck,
  Route,
  Truck,
  Warehouse,
  PackageCheck,
} from "lucide-react";

const process = [
  {
    icon: ClipboardCheck,
    title: "Consultation",
    description:
      "We analyze your logistics requirements and recommend the most efficient transportation strategy.",
  },
  {
    icon: Route,
    title: "Planning",
    description:
      "Our specialists optimize routes, schedules, and documentation for smooth operations.",
  },
  {
    icon: Truck,
    title: "Transportation",
    description:
      "Cargo is transported safely through road, sea, air, or rail using trusted global partners.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Secure storage and inventory management ensure flexibility across your supply chain.",
  },
  {
    icon: PackageCheck,
    title: "Final Delivery",
    description:
      "Shipments arrive on time with complete tracking and customer satisfaction.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Our Process
          </p>

          <h2 className="text-5xl font-bold mt-4">
            How We Deliver Success
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Every shipment follows a proven process that ensures reliability,
            transparency, and efficiency from origin to destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-6">
                  <Icon size={36} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}