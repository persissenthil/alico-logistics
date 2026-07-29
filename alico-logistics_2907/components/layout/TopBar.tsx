import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:block absolute top-0 left-0 w-full z-40 bg-transparent text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1 text-sm">

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <Phone size={15} />
            <span>+44 20 1234 5678</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={15} />
            <span>info@alico.com</span>
          </div>

        </div>

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <span>London, United Kingdom</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={15} />
            <span>Mon - Fri : 9:00 AM - 6:00 PM</span>
          </div>

        </div>

      </div>
    </div>
  );
}