import React from 'react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pawsh-pink via-pawsh-gold to-white flex flex-col items-center justify-center p-8">
      <section className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 border-4 border-pawsh-gold">
        <h1 className="text-5xl font-extrabold font-playfair text-center text-pawsh-pink mb-6 drop-shadow-lg">Contact Us</h1>
        <p className="text-center text-gray-700 mb-8">We'd love to hear from you! Reach out with questions, feedback, or to book your pet’s next spa day.</p>
        <form className="space-y-6">
          <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-gray-300 focus:border-pawsh-pink outline-none" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg border border-gray-300 focus:border-pawsh-pink outline-none" required />
          <textarea placeholder="Your Message" className="w-full p-3 rounded-lg border border-gray-300 focus:border-pawsh-pink outline-none min-h-[120px]" required />
          <button type="submit" className="w-full bg-pawsh-pink text-white font-bold py-3 rounded-lg shadow-md hover:bg-pawsh-gold transition-colors">Send Message</button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Email: <a href="mailto:info@pawshpetspa.com" className="text-pawsh-pink underline">info@pawshpetspa.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-pawsh-pink underline">(123) 456-7890</a></p>
          <p className="mt-2">123 Pawsh Lane, Pet City, PC 12345</p>
        </div>
      </section>
    </main>
  );
}
