export default function Hero() {
  return (
    <section className="bg-blue-900 text-white min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-6xl font-bold leading-tight">
          Global Logistics <br />
          Solutions You Can Trust
        </h1>

        <p className="mt-6 text-xl max-w-2xl text-blue-100">
          Reliable freight forwarding, customs clearance,
          warehousing, and supply chain solutions for businesses
          worldwide.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100">
            Request a Quote
          </button>

          <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900">
            Our Services
          </button>
        </div>

      </div>
    </section>
  );
}