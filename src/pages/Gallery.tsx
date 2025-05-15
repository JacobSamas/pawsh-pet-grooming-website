import React from 'react';

const galleryImages = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg',
];

export default function Gallery() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-pawsh-pink to-pawsh-gold p-8">
      <h1 className="text-5xl font-extrabold font-playfair text-center text-pawsh-pink mb-8 drop-shadow-lg">Pet Gallery</h1>
      <p className="text-center text-lg mb-10 text-gray-600">A showcase of our happiest clients and proudest moments!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {galleryImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Happy pet ${i+1}`}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 border-4 border-pawsh-gold"
          />
        ))}
      </div>
    </main>
  );
}
