import {
  FileText,
  ClipboardCheck,
  Truck,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Request Quote",
    description:
      "Tell us about your shipment and receive a competitive logistics quotation.",
  },
  {
    icon: ClipboardCheck,
    title: "Planning & Documentation",
    description:
      "Our experts prepare documentation and choose the best transportation route.",
  },
  {
    icon: Truck,
    title: "Transportation",
    description:
      "Your cargo is transported safely using our trusted global logistics network.",
  },
  {
    icon: PackageCheck,
    title: "Safe Delivery",
    description:
      "We deliver your shipment on time with complete tracking and customer support.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-[6px] font-semibold mb-4">
            OUR PROCESS
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            How We Deliver
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            Every shipment follows a proven process that guarantees efficiency,
            transparency, and timely delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">

                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                </div>

                <div className="mt-8 mb-6 flex justify-center">

                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                    <Icon size={30} className="text-blue-600" />

                  </div>

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {step.title}
                </h3>

                <p className="text-slate-600 leading-8">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}