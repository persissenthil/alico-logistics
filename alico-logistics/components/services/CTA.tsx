import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-blue-700">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Move Your Business Forward?
        </h2>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 mb-10">
          Whether you need domestic transportation, international freight,
          warehousing, or complete supply chain management, our team is ready
          to deliver reliable logistics solutions tailored to your business.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/quote"
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Request a Quote
          </Link>

          <Link
            href="/contact"
            className="border border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Contact Us
          </Link>

        </div>

      </div>
    </section>
  );
}