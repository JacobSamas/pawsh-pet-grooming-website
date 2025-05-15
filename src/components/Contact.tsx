
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Received!",
      description: "Thank you for contacting Pawsh Pet Spa. We'll be in touch shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-pawsh-blue/20"
    >
      <div className="container-pawsh">
        <h2 className={cn(
          "section-title",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}>
          Get in Touch
        </h2>
        <p className={cn(
          "section-subtitle",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.2s"}}
        >
          Have a question or ready to book an appointment? Contact us today!
        </p>

        <div className={cn(
          "mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.3s"}}
        >
          {/* Contact Info */}
          <div className="flex flex-col">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-playfair text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-pawsh-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <address className="not-italic text-muted-foreground">
                      123 Luxe Avenue<br />
                      Beverly Hills, CA 90210
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-pawsh-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <a href="tel:+18001234567" className="text-muted-foreground hover:text-pawsh-gold transition-colors">
                      (800) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-pawsh-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <a href="mailto:info@pawshpetspa.com" className="text-muted-foreground hover:text-pawsh-gold transition-colors">
                      info@pawshpetspa.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
              <iframe
                title="Pawsh Pet Spa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.99658871059!2d-118.43435875!3d34.0762349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1620123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-playfair text-2xl font-semibold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-pawsh-pink/30 focus-visible:ring-pawsh-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-pawsh-pink/30 focus-visible:ring-pawsh-gold"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-pawsh-pink/30 focus-visible:ring-pawsh-gold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your pet and what services you're interested in..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none border-pawsh-pink/30 focus-visible:ring-pawsh-gold"
                />
              </div>
              
              <Button type="submit" className="btn-pawsh w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
