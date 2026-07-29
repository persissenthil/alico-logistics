import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Company */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-5">
            Alico
          </h2>

          <p className="leading-7">
            Alico Logistics provides reliable freight forwarding,
            warehousing, customs clearance and supply chain
            solutions across the globe.
          </p>

          <div className="flex gap-4 mt-6">
            <FaFacebookF className="text-xl hover:text-blue-500 cursor-pointer transition" />
            <FaLinkedinIn className="text-xl hover:text-blue-500 cursor-pointer transition" />
            <FaInstagram className="text-xl hover:text-blue-500 cursor-pointer transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/quote">Request Quote</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Our Services
          </h3>

          <ul className="space-y-3">
            <li>Road Freight</li>
            <li>Air Freight</li>
            <li>Ocean Freight</li>
            <li>Warehousing</li>
            <li>Customs Clearance</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <Phone size={18} />
              <span>+44 20 1234 5678</span>
            </div>

            <div className="flex gap-3">
              <Mail size={18} />
              <span>info@alico.com</span>
            </div>

            <div className="flex gap-3">
              <MapPin size={18} />
              <span>London, United Kingdom</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p>
            © 2026 Alico Logistics. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}