import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-20 pb-8 border-t border-white/10">
      <div className="container-custom px-4">
        {/* TOP */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">
              EXCLUSIVE
            </h2>

            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              The best place to buy electronics, fashion and lifestyle products
              at the best price. Fast delivery & secure payment guaranteed.
            </p>

            {/* Newsletter */}
            <div className="flex items-center border border-white/20 rounded-full overflow-hidden focus-within:border-white transition">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-5 py-3 text-sm w-full outline-none placeholder:text-gray-500"
              />
              <button className="bg-white text-black px-5 py-3 flex items-center gap-2 font-medium hover:bg-gray-200 transition">
                <Send size={16} /> Subscribe
              </button>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-white font-semibold mb-5">Shop</h3>
            <ul className="space-y-3 text-sm">
              {[
                "All Products",
                "Categories",
                "Flash Sale",
                "Popular",
                "New Arrivals",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-white font-semibold mb-5">Customer Care</h3>
            <ul className="space-y-3 text-sm">
              {[
                "My Account",
                "Track Order",
                "Wishlist",
                "Cart",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-5">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Dhaka, Bangladesh</li>
              <li>support@exclusive.com</li>
              <li>+880 1234-567890</li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6 text-gray-400">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-white hover:scale-110 transition transform"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 Exclusive — All Rights Reserved
          </p>

          <div className="flex items-center gap-4 opacity-80">
            <img src="https://i.ibb.co/0n3Y3hF/visa.png" className="h-6" />
            <img
              src="https://i.ibb.co/G9z3P7k/mastercard.png"
              className="h-6"
            />
            <img src="https://i.ibb.co/F5n9kGf/bkash.png" className="h-6" />
            <img src="https://i.ibb.co/z8wK7vM/nagad.png" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
