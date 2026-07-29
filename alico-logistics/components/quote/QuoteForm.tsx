"use client";

export default function QuoteForm() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
            Get Your Quote
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Request Freight Pricing
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Complete the form below and our logistics specialists will provide
            a customized quotation based on your shipment requirements.
          </p>
        </div>

        <form className="bg-white shadow-xl rounded-2xl p-10">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Company Name"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Origin"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Destination"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <select className="border rounded-lg px-5 py-4">
              <option>Freight Type</option>
              <option>Air Freight</option>
              <option>Sea Freight</option>
              <option>Road Transport</option>
              <option>Rail Freight</option>
            </select>

            <input
              type="text"
              placeholder="Cargo Weight"
              className="border rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

          </div>

          <textarea
            rows={6}
            placeholder="Shipment Details"
            className="border rounded-lg px-5 py-4 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition"
          >
            Request Quote
          </button>

        </form>

      </div>
    </section>
  );
}