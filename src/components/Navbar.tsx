
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
            {["Home", "Services", "Gallery", "Testimonials", "FAQ", "Contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-pawsh-gold transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
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
              {["Home", "Services", "Gallery", "Testimonials", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 text-foreground hover:text-pawsh-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
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
