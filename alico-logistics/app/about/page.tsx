import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[420px]">
        <Image
          src="/images/warehouse.jpg"
          alt="About Alico Logistics"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold">
            About Us
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Delivering Logistics Excellence Across the Globe
          </p>
        </div>
      </section>

      {/* Company */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <Image
              src="/images/about.jpg"
              alt="Alico Logistics"
              width={700}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
              About Company
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Trusted Logistics Partner Since 2000
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Alico Logistics is a global freight forwarding and supply
              chain company dedicated to providing reliable transportation,
              warehousing, customs clearance, and distribution services.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              With decades of experience and a worldwide network, we help
              businesses move cargo safely, efficiently, and on time.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="bg-blue-600 rounded-xl p-6 text-white text-center">
                <h3 className="text-4xl font-bold">25+</h3>
                <p>Years Experience</p>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 text-white text-center">
                <h3 className="text-4xl font-bold">120+</h3>
                <p>Countries Served</p>
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* Mission & Vision */}

<section className="bg-gray-50 py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
        Our Purpose
      </p>

      <h2 className="text-5xl font-bold mt-4">
        Mission & Vision
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-10">

      {/* Mission */}

      <div className="bg-white rounded-xl shadow-lg p-10">
        <h3 className="text-3xl font-bold mb-5">
          Our Mission
        </h3>

        <p className="text-gray-600 leading-8">
          To deliver dependable logistics solutions through innovation,
          operational excellence, and customer-focused service that helps
          businesses grow across global markets.
        </p>
      </div>

      {/* Vision */}

      <div className="bg-white rounded-xl shadow-lg p-10">
        <h3 className="text-3xl font-bold mb-5">
          Our Vision
        </h3>

        <p className="text-gray-600 leading-8">
          To become one of the world's most trusted logistics companies by
          connecting businesses with reliable, efficient, and sustainable
          transportation services.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Core Values */}

<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
        Our Values
      </p>

      <h2 className="text-5xl font-bold mt-4">
        What Drives Our Success
      </h2>

      <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
        Our values shape every shipment, every customer relationship, and every
        logistics solution we deliver.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-5">🤝</div>
        <h3 className="text-2xl font-bold mb-3">Integrity</h3>
        <p className="text-gray-600">
          We build lasting partnerships through honesty, transparency, and trust.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-5">⚡</div>
        <h3 className="text-2xl font-bold mb-3">Efficiency</h3>
        <p className="text-gray-600">
          We optimize every process to ensure fast and reliable deliveries.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-5">🌍</div>
        <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
        <p className="text-gray-600">
          Our worldwide logistics network connects businesses across continents.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-5">⭐</div>
        <h3 className="text-2xl font-bold mb-3">Customer Focus</h3>
        <p className="text-gray-600">
          Every solution is tailored to meet our customers' unique business needs.
        </p>
      </div>

    </div>

  </div>
</section>
{/* Company Timeline */}

<section className="bg-gray-50 py-24">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[5px] text-blue-600 font-semibold">
        Our Journey
      </p>

      <h2 className="text-5xl font-bold mt-4">
        Company Timeline
      </h2>

      <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
        Over the years, Alico Logistics has grown into a trusted logistics
        partner, expanding our network and services to meet the needs of
        businesses worldwide.
      </p>
    </div>

    <div className="relative border-l-4 border-blue-600 ml-6">

      {/* Timeline Item */}
      <div className="mb-12 ml-8 relative">
        <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>

        <h3 className="text-2xl font-bold">2000</h3>
        <h4 className="text-xl font-semibold mt-2">
          Company Founded
        </h4>
        <p className="text-gray-600 mt-3 leading-7">
          Alico Logistics was established with a vision to provide reliable
          freight forwarding and transportation services.
        </p>
      </div>

      {/* Timeline Item */}
      <div className="mb-12 ml-8 relative">
        <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>

        <h3 className="text-2xl font-bold">2008</h3>
        <h4 className="text-xl font-semibold mt-2">
          International Expansion
        </h4>
        <p className="text-gray-600 mt-3 leading-7">
          Expanded operations into international markets and built a strong
          global logistics network.
        </p>
      </div>

      {/* Timeline Item */}
      <div className="mb-12 ml-8 relative">
        <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>

        <h3 className="text-2xl font-bold">2016</h3>
        <h4 className="text-xl font-semibold mt-2">
          Warehousing Network
        </h4>
        <p className="text-gray-600 mt-3 leading-7">
          Opened multiple warehouse and distribution centers to improve
          supply chain efficiency.
        </p>
      </div>

      {/* Timeline Item */}
      <div className="ml-8 relative">
        <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>

        <h3 className="text-2xl font-bold">2025</h3>
        <h4 className="text-xl font-semibold mt-2">
          Serving 120+ Countries
        </h4>
        <p className="text-gray-600 mt-3 leading-7">
          Today, Alico Logistics proudly supports businesses worldwide with
          comprehensive freight, warehousing, and customs solutions.
        </p>
      </div>

    </div>

  </div>
</section>
    </>
  );
}