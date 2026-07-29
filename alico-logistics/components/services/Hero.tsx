import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[450px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/truck.jpg"
        alt="Logistics Services"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Services
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Reliable logistics solutions tailored to businesses worldwide.
          From transportation to warehousing, we deliver excellence at
          every stage of your supply chain.
        </p>
      </div>
    </section>
  );
}