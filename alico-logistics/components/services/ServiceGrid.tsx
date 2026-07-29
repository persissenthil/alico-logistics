import {
  Truck,
  Warehouse,
  Globe,
  PackageCheck,
  ShieldCheck,
  Ship,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Road Freight",
    description:
      "Reliable domestic and cross-border trucking solutions for businesses of all sizes.",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Cost-effective international sea freight services with worldwide coverage.",
  },
  {
    icon: Globe,
    title: "Air Freight",
    description:
      "Fast global air cargo transportation for urgent and time-sensitive shipments.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Secure storage facilities with inventory management and distribution services.",
  },
  {
    icon: PackageCheck,
    title: "Customs Clearance",
    description:
      "Smooth customs documentation and compliance for international shipments.",
  },
  {
    icon: ShieldCheck,
    title: "Cargo Insurance",
    description:
      "Protect your valuable goods with comprehensive cargo insurance coverage.",
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-blue-600 uppercase tracking-[6px] font-semibold mb-4">
            OUR SERVICES
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Complete Logistics Solutions
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            We provide end-to-end logistics services that help businesses move
            goods safely, efficiently, and on time across the globe.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">

                  <Icon
                    size={30}
                    className="text-blue-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-8">
                  {service.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}