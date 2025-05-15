import React from 'react';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pawsh-pink via-white to-pawsh-gold flex flex-col items-center justify-center p-8">
      <section className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold font-playfair mb-4 text-pawsh-gold drop-shadow-lg">Our Story</h1>
        <p className="mb-6 text-lg text-gray-700 font-light">Pawsh Pet Spa was born from a love of animals and a passion for luxury care. Our founders, inspired by their own furry companions, set out to create a grooming experience that feels like a day at the spa—relaxing, rejuvenating, and joyful for every pet.</p>
        <img src="/images/team.jpg" alt="Our team" className="rounded-3xl shadow-xl mx-auto mb-8 w-full max-w-md" />
        <blockquote className="italic text-xl text-pawsh-pink mb-6">“Where every tail wags with joy and every paw leaves pampered.”</blockquote>
        <p className="text-md text-gray-600">Meet our passionate team, discover our philosophy, and see how we make every pet feel special. <span className="font-semibold text-pawsh-gold">Welcome to the Pawsh family!</span></p>
      </section>
    </main>
  );
}
