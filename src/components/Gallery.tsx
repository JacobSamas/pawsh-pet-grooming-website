
import { useState, useEffect, useRef } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface BeforeAfterImage {
  before: string;
  after: string;
  petName: string;
  breed: string;
}

const galleryImages: BeforeAfterImage[] = [
  {
    before: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    petName: "Luna",
    breed: "Shih Tzu"
  },
  {
    before: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    petName: "Max",
    breed: "Golden Retriever"
  },
  {
    before: "https://images.unsplash.com/photo-1585419062137-91a5c3e8a563?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    petName: "Oliver",
    breed: "Tabby Cat"
  }
];

const Gallery = () => {
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
      id="gallery" 
      ref={sectionRef}
      className="py-20 bg-pawsh-pink/20"
    >
      <div className="container-pawsh">
        <h2 className={cn(
          "section-title",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}>
          Before & After Gallery
        </h2>
        <p className={cn(
          "section-subtitle",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.2s"}}
        >
          See the transformative results of our grooming services. Our skilled groomers work wonders!
        </p>

        <div className={cn(
          "mt-12 relative",
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
              {galleryImages.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4 hover-lift">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <img 
                            src={item.before} 
                            alt={`${item.petName} before grooming`}
                            className="w-full h-48 object-cover rounded"
                          />
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            Before
                          </div>
                        </div>
                        <div className="relative flex-1">
                          <img 
                            src={item.after} 
                            alt={`${item.petName} after grooming`}
                            className="w-full h-48 object-cover rounded"
                          />
                          <div className="absolute top-2 left-2 bg-pawsh-gold text-white text-xs px-2 py-1 rounded">
                            After
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="font-playfair font-medium text-lg">{item.petName}</h4>
                        <p className="text-muted-foreground text-sm">{item.breed}</p>
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

export default Gallery;
