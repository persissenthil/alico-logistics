"use client";

import { Truck, Globe2, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Truck,
    number: "5000+",
    title: "Shipments Delivered",
  },
  {
    icon: Globe2,
    number: "120+",
    title: "Countries Covered",
  },
  {
    icon: Users,
    number: "250+",
    title: "Business Clients",
  },
  {
    icon: Award,
    number: "25+",
    title: "Years Experience",
  },
];

export default function Stats() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center text-white">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div key={index}>
                <Icon className="mx-auto mb-4" size={42} />
                <h3 className="text-5xl font-bold">{stat.number}</h3>
                <p className="mt-3 text-blue-100">{stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}