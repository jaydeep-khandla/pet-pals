import React, { useState } from "react";
import { FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialIcons = [
    { Icon: FaFacebookF, color: "bg-blue-600" },
    { Icon: FaTwitter, color: "bg-sky-500" },
    { Icon: FaInstagram, color: "bg-pink-600" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center">
              <FaPaw className="mr-2 text-yellow-300" /> PetPal's
            </h3>
            <p className="text-sm leading-relaxed">
              Connecting hearts and paws. At PetPal's, we believe in creating forever homes and wagging tails. Join us in our mission to spread love,
              one adoption at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-300 pb-2 inline-block">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> About
                </a>
              </li>
              <li>
                <a href="/petlist" className="hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Adoption
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-300 pb-2 inline-block">Reach Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-yellow-300" /> info@petpals.com
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-yellow-300" /> (123) 456-7890
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-yellow-300" />
                <span>
                  123 Pet Street,
                  <br />
                  Animalville, PA 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-300 pb-2 inline-block">Stay Updated</h3>
            <p className="mb-4 text-sm">Join our pack! Get the latest news and cute pet pics.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="p-2 rounded-l-lg focus:outline-none flex-grow text-gray-800" />
              <button
                type="submit"
                className="bg-yellow-300 text-purple-700 font-bold py-2 px-4 rounded-r-lg hover:bg-yellow-400 transition duration-300"
              >
                Woof!
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 flex justify-center space-x-6">
          {socialIcons.map(({ Icon, color }, index) => (
            <a
              key={index}
              href="#"
              className={`${color} p-3 rounded-full transition duration-300 transform hover:scale-110 hover:rotate-6`}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon className={`text-2xl ${hoveredIcon === index ? "animate-bounce" : ""}`} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} PetPal's. All rights reserved. Made with <span className="text-red-300">♥</span> for pets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
