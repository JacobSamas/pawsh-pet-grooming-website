
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container-pawsh">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-playfair font-semibold mb-4">
              Pawsh<span className="text-pawsh-gold">.</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Where luxury meets care for your beloved pets. Our skilled groomers provide 
              exceptional services that will leave your furry family members looking and feeling their best.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pawsh-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pawsh-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pawsh-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav>
              <ul className="space-y-2">
                {["Home", "Services", "Gallery", "Testimonials", "FAQ", "Contact"].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-pawsh-gold transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Hours */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {year} Pawsh Pet Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
