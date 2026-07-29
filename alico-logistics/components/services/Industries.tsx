import Image from "next/image";

const industries = [
  {
    title: "Automotive",
    image: "/images/automotive.jpg",
    description:
      "Efficient transportation of automotive parts and finished vehicles with secure supply chain management.",
  },
  {
    title: "Healthcare",
    image: "/images/healthcare.jpg",
    description:
      "Reliable medical logistics with safe handling for pharmaceuticals and healthcare equipment.",
  },
  {
    title: "Retail",
    image: "/images/retail.jpg",
    description:
      "Fast distribution solutions supporting retail stores, e-commerce, and inventory replenishment.",
  },
  {
    title: "Manufacturing",
    image: "/images/manufacturing.jpg",
    description:
      "Complete logistics support for raw materials, production facilities, and finished products.",
  },
];

export default function Industries() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-blue-600 font-semibold mb-4">
            INDUSTRIES WE SERVE
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Logistics Solutions for Every Industry
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            From manufacturing to healthcare and retail, we provide customized
            logistics services designed to meet the unique needs of every
            industry.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {industries.map((industry, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >

              <div className="relative h-56">

            <Image
  src={industry.image}
  alt={industry.title}
  fill
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         25vw"
  className="object-cover"
/>

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold mb-4">
                  {industry.title}
                </h3>

                <p className="text-slate-600 leading-8">
                  {industry.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}