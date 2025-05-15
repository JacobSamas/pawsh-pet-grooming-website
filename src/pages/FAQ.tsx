import React from 'react';

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer a full range of grooming services, including baths, haircuts, nail trims, and spa treatments for dogs and cats."
  },
  {
    q: "How do I book an appointment?",
    a: "Use our easy online booking flow or call us directly. Walk-ins are welcome, but appointments are recommended!"
  },
  {
    q: "What should I bring for my pet's appointment?",
    a: "Bring your pet's favorite toy or blanket for comfort. Please ensure your pet is up-to-date on vaccinations."
  },
  {
    q: "Can I stay during my pet’s grooming?",
    a: "Absolutely! We have a cozy waiting area with complimentary coffee and WiFi."
  },
  {
    q: "Do you groom cats, too?",
    a: "Yes, we love cats! Our groomers are trained to handle felines with extra care."
  }
];

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pawsh-gold via-white to-pawsh-pink flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold font-playfair text-center text-pawsh-gold mb-8 drop-shadow-lg">Frequently Asked Questions</h1>
      <div className="max-w-2xl w-full mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 border-l-8 border-pawsh-pink hover:border-pawsh-gold transition-all duration-300">
            <h2 className="text-xl font-bold text-pawsh-pink mb-2">{faq.q}</h2>
            <p className="text-gray-700 text-md">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
