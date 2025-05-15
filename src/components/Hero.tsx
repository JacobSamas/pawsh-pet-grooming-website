
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Crown, PawPrint } from "lucide-react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  // Featured pets carousel data
  const featuredPets = [
    {
      name: "Bella",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      breed: "Shih Tzu"
    },
    {
      name: "Max",
      image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      breed: "Golden Retriever"
    },
    {
      name: "Oliver",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      breed: "Labrador"
    }
  ];

  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Logo animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredPets.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredPets.length]);

  // Animation variants for paw prints
  const pawVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      y: [i % 2 === 0 ? 40 : 20, 0],
      transition: {
        delay: i * 0.15,
        duration: 1.5,
        ease: "easeInOut"
      }
    })
  };

  // Generate random positions for 8 paw prints
  const pawPrints = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: `${10 + (i * 10) % 80}%`,
    y: `${15 + (i * 12) % 70}%`,
    rotation: Math.floor(Math.random() * 60) - 30
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Paw print animation overlay */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {pawPrints.map((paw) => (
          <motion.div
            key={paw.id}
            custom={paw.id}
            variants={pawVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              position: "absolute", 
              left: paw.x, 
              top: paw.y,
              rotate: paw.rotation
            }}
            className="text-pawsh-gold/30"
          >
            <PawPrint size={paw.id % 2 === 0 ? 48 : 32} />
          </motion.div>
        ))}
      </div>

      {/* Logo reveal animation */}
      <motion.div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: [0, 1, 0] } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4">
          <Crown size={48} className="text-pawsh-gold mr-4" />
          <h1 className="font-playfair text-3xl font-bold">Pawsh Pet Spa</h1>
        </div>
      </motion.div>

      {/* Split design content */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
        {/* Left side - gradient background with CTA */}
        <div className="bg-gradient-to-br from-pawsh-pink to-pawsh-cream flex items-center z-1">
          <div className="p-8 md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight">
                Where Every Pet Gets the<br className="hidden md:block" /> Royal Treatment
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                Experience the ultimate in pet grooming luxury. At Pawsh Pet Spa, 
                we believe your furry family members deserve nothing but the best care.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  className={cn(
                    "btn-pawsh bg-pawsh-gold hover:bg-pawsh-gold/90 text-lg px-8 py-6",
                    "shadow-[0_0_20px_rgba(212,184,134,0.5)]",
                    "relative overflow-hidden group"
                  )}
                >
                  <span className="relative z-10">Book Appointment</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: ["100%", "-100%"], opacity: [0, 0.5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  />
                </Button>
                
                <Button variant="outline" className="bg-transparent border-white text-black hover:bg-white/20 text-lg px-8 py-6">
                  Our Services
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right side - carousel of pampered pets */}
        <div className="bg-white relative overflow-hidden flex items-center">
          {featuredPets.map((pet, index) => (
            <motion.div
              key={pet.name}
              className="absolute inset-0 flex items-center justify-center p-12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                x: index === currentIndex ? 0 : 100
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full max-w-md mx-auto">
                <div className="absolute -top-6 -right-6 z-10">
                  <Crown size={40} className="text-pawsh-gold fill-pawsh-gold/30" />
                </div>
                <div className="h-full w-full overflow-hidden rounded-xl shadow-2xl">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="font-playfair font-semibold">{pet.name}</h3>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          
          {/* Carousel indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
            {featuredPets.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  idx === currentIndex ? "bg-pawsh-gold w-8" : "bg-pawsh-gold/30"
                )}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Show pet ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg className="w-6 h-9 text-pawsh-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
