
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  petName: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "My Yorkie has never looked better! The team at Pawsh truly puts every pet's comfort first, and the results speak for themselves.",
    author: "Jennifer L.",
    petName: "Bella",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    quote: "I've tried several groomers over the years, and none compare to Pawsh. My cat actually purrs during his nail trimming now!",
    author: "David M.",
    petName: "Whiskers",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "The luxury treatment my dog receives at Pawsh is unmatched. They're patient with her anxiety and always make her feel comfortable.",
    author: "Sophia T.",
    petName: "Daisy",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-pawsh-blue/10"
    >
      <div className="container-pawsh">
        <h2 className={cn(
          "section-title",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}>
          What Pet Parents Say
        </h2>
        <p className={cn(
          "section-subtitle",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.2s"}}
        >
          Don't just take our word for it. Hear what our happy customers and their pampered pets have to say.
        </p>

        <div className={cn(
          "mt-12", 
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.3s"}}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1 h-full">
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6 h-full flex flex-col hover-lift">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={cn(
                              "fill-current", 
                              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="italic text-gray-700 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="mt-6 flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="ml-4">
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">Pet Parent to {testimonial.petName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 bg-white/80 hover:bg-white" />
              <CarouselNext className="right-0 bg-white/80 hover:bg-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
