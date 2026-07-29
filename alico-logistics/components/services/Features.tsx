import {
  Clock3,
  Globe2,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Fast Delivery",
    description:
      "Optimized transportation routes ensure your shipments arrive on time.",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description:
      "Our worldwide logistics network connects businesses across more than 120 countries.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Handling",
    description:
      "Every shipment is handled with care and monitored throughout its journey.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our logistics specialists are available whenever you need assistance.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-blue-600 font-semibold mb-4">
            WHY CHOOSE OUR SERVICES
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Logistics Built Around Your Business
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            We combine experience, technology, and a global transportation
            network to provide dependable logistics solutions for every shipment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-8 text-center hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-blue-600 group-hover:text-white"
                    />

                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-600">
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