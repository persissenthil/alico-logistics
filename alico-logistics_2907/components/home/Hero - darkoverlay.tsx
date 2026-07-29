export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="max-w-3xl text-white">
          <p className="uppercase tracking-[4px] text-blue-300 mb-4">
            Global Freight Forwarding
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            Logistics Solutions
            <br />
            You Can Trust
          </h1>

          <p className="mt-8 text-xl text-gray-200">
            Reliable freight forwarding, customs clearance,
            warehousing and supply chain solutions for businesses
            across the world.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold">
              Request Quote
            </button>

            <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}