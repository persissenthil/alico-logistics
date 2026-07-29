const services = [
  {
    title: "Air Freight",
    description: "Fast and reliable international air cargo solutions.",
    icon: "✈️",
  },
  {
    title: "Sea Freight",
    description: "Cost-effective ocean freight for global shipping.",
    icon: "🚢",
  },
  {
    title: "Road Transport",
    description: "Safe and efficient domestic and international trucking.",
    icon: "🚛",
  },
  {
    title: "Warehousing",
    description: "Secure storage and inventory management solutions.",
    icon: "🏢",
  },
  {
    title: "Customs Clearance",
    description: "Smooth customs documentation and clearance services.",
    icon: "📦",
  },
  {
    title: "Supply Chain",
    description: "End-to-end logistics and supply chain management.",
    icon: "🌍",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our Services
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Comprehensive logistics solutions tailored to your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl">{service.icon}</div>

              <h3 className="text-2xl font-semibold mt-6">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}