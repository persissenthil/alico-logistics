// export default function Navbar() {
//   return (
//     <header className="w-full bg-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-blue-700">
//           Alico
//         </h1>

//         {/* Navigation */}
//         <nav>
//           <ul className="flex gap-8 text-gray-700 font-medium">
//             <li><a href="#">Home</a></li>
//             <li><a href="#">About</a></li>
//             <li><a href="#">Services</a></li>
//             <li><a href="#">Industries</a></li>
//             <li><a href="#">Quote</a></li>
//             <li><a href="#">Contact</a></li>
//           </ul>
//         </nav>

//       </div>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
 <header
  className={`w-full transition-all duration-300 ${
    scrolled
      ? "bg-white shadow-lg py-4"
      : "bg-transparent py-6"
  }`}
>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        <Link
          href="/"
          className={`text-4xl font-extrabold tracking-tight transition ${
            scrolled ? "text-blue-600" : "text-white"
          }`}
        >
          Alico
        </Link>

        <nav className="hidden md:flex gap-5">

          {[
            "Home",
            "About",
            "Services",
            "Industries",
            "Quote",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className={`font-medium transition hover:text-blue-500 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}

        </nav>

      </div>
    </header>
  );
}