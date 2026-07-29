const features = [
  {
    title: "Worldwide Network",
    description: "Reliable logistics partners across the globe.",
  },
  {
    title: "Fast Delivery",
    description: "On-time shipments with efficient transportation.",
  },
  {
    title: "Secure Cargo",
    description: "Your goods are handled safely from pickup to delivery.",
  },
  {
    title: "24/7 Customer Support",
    description: "Our team is available whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose Alico
          </h2>

          <p className="mt-4 text-gray-600">
            We provide reliable logistics solutions with quality service and global reach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-xl p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}