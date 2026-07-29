import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function ContactInfo() {
  const items = [
    {
      icon: MapPin,
      title: "Office Address",
      text: "123 Logistics Street, London, United Kingdom",
    },
    {
      icon: Phone,
      title: "Phone",
      text: "+44 20 1234 5678",
    },
    {
      icon: Mail,
      title: "Email",
      text: "info@alico.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      text: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="text-center p-8 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}