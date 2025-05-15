
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bath, Scissors, Dog, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const services: Service[] = [
  {
    icon: <Bath size={48} className="text-white" />,
    title: "Premium Bathing",
    description: "Luxurious bathing experience with organic shampoos and conditioners tailored to your pet's coat type and skin needs.",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-300"
  },
  {
    icon: <Scissors size={48} className="text-white" />,
    title: "Stylish Haircuts",
    description: "Professional grooming by certified stylists who stay up-to-date with the latest pet styling trends and techniques.",
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-300"
  },
  {
    icon: <Dog size={48} className="text-white" />,
    title: "Nail & Paw Care",
    description: "Gentle nail trimming, filing, and paw pad treatments to keep your pet's feet healthy and comfortable.",
    bgColor: "bg-gradient-to-br from-amber-400 to-amber-300"
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  // Horizontal scroll logic with framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create smooth horizontal scrolling effect based on vertical scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const smoothX = useSpring(xTransform, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // State for currently hovered bubble
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);
  
  // Audio setup for bubble pop sound
  const [audio] = useState(() => typeof window !== 'undefined' ? new Audio('/bubble-pop.mp3') : null);
  
  // Play sound when hovering a bubble
  const playBubbleSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.2;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-pawsh-white to-pawsh-cream min-h-[800px] max-w-full"
      style={{ position: 'relative' }} // Adding position relative to fix framer-motion warning
    >
      <div className="container-pawsh mb-16">
        <div ref={ref}>
          <h2 className={cn(
            "section-title",
            inView ? "animate-slide-up" : "opacity-0"
          )}>
            Our Luxury Services
          </h2>
          <p className={cn(
            "section-subtitle",
            inView ? "animate-slide-up" : "opacity-0"
          )} 
          style={{animationDelay: "0.2s"}}
          >
            We offer a comprehensive range of grooming services designed to pamper your pet
            and keep them looking and feeling their best.
          </p>
        </div>
      </div>

      {/* Horizontal bubble services */}
      <motion.div 
        className="relative h-[500px] flex items-center"
        style={{ x: smoothX, position: 'relative' }}
      >
        {/* Background bubbles */}
        <div className="absolute inset-0 -z-10">
          {Array.from({length: 15}).map((_, i) => (
            <motion.div
              key={`bg-bubble-${i}`}
              className="absolute rounded-full bg-pawsh-gold/5 backdrop-blur-sm"
              style={{
                width: `${30 + Math.random() * 60}px`,
                height: `${30 + Math.random() * 60}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      
        <div className="flex space-x-24 pl-[50vw] pr-[50vw]">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => {
                setHoveredBubble(index);
                playBubbleSound();
              }}
              onHoverEnd={() => setHoveredBubble(null)}
            >
              <div className="relative">
                {/* Main bubble */}
                <motion.div 
                  className={cn(
                    "w-[320px] h-[320px] rounded-full flex flex-col items-center justify-center text-center p-8 shadow-xl",
                    service.bgColor
                  )}
                  animate={hoveredBubble === index ? {
                    scale: [1, 1.06, 1.02],
                  } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-4 relative">
                    <Circle 
                      size={80} 
                      className="fill-white/30 text-transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {service.description}
                  </p>
                </motion.div>
                
                {/* Bubble sparkles/pop effect */}
                {hoveredBubble === index && (
                  <>
                    {Array.from({length: 8}).map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: `${50 + (Math.random() * 60 - 30)}%`,
                          left: `${50 + (Math.random() * 60 - 30)}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          duration: 0.8,
                          delay: Math.random() * 0.3,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <div className="container-pawsh mt-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="btn-pawsh">Explore All Services</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
