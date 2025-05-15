
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container-pawsh flex items-center justify-between">
        <a href="#" className="text-2xl md:text-3xl font-playfair font-bold">
          Pawsh<span className="text-pawsh-gold">.</span>
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#home" className="text-foreground hover:text-pawsh-gold transition-colors">Home</a></li>
<li><a href="#services" className="text-foreground hover:text-pawsh-gold transition-colors">Our Services</a></li>
<li><Link to="/Gallery" className="text-foreground hover:text-pawsh-gold transition-colors">Pet Gallery</Link></li>
<li><Link to="/FAQ" className="text-foreground hover:text-pawsh-gold transition-colors">FAQs</Link></li>
<li><Link to="/About" className="text-foreground hover:text-pawsh-gold transition-colors">About Us</Link></li>
<li><Link to="/Contact" className="text-foreground hover:text-pawsh-gold transition-colors">Contact & Location</Link></li>
          </ul>
        </nav>
        
        <button className="hidden md:block btn-pawsh">Book Appointment</button>
        
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md py-4 animate-fade-in">
          <nav className="container-pawsh">
            <ul className="flex flex-col space-y-3">
              <li><a href="#home" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
<li><a href="#services" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Our Services</a></li>
<li><Link to="/Gallery" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Pet Gallery</Link></li>
<li><Link to="/FAQ" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>FAQs</Link></li>
<li><Link to="/About" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
<li><Link to="/Contact" className="block py-2 text-foreground hover:text-pawsh-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Contact & Location</Link></li>
              <li>
                <button className="btn-pawsh w-full mt-4">Book Appointment</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
