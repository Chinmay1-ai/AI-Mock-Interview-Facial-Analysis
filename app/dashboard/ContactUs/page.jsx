"use client";
import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 mb-8">
        Have any questions? Feel free to reach out!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
      
      <div className="flex justify-center gap-6 mt-8">
        <a href="#" className="text-blue-600 hover:text-blue-800 transition">
          <Facebook size={28} />
        </a>
        <a href="#" className="text-blue-400 hover:text-blue-600 transition">
          <Twitter size={28} />
        </a>
        <a href="#" className="text-pink-500 hover:text-pink-700 transition">
          <Instagram size={28} />
        </a>
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          <Mail size={20} /> support@example.com
        </p>
        <p className="flex items-center justify-center gap-2 mt-2">
          <Phone size={20} /> +123 456 7890
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
