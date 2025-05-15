
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BookingFlow from "@/components/BookingFlow";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Pawsh Pet Spa | Luxury Pet Grooming";

    // Add scroll event listener for fade-in-scroll elements
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <BookingFlow />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
