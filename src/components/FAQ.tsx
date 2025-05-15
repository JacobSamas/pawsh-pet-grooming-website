
import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How often should I groom my pet?",
    answer: "The frequency of grooming depends on your pet's breed, hair length, and lifestyle. Generally, most dogs benefit from professional grooming every 4-8 weeks. Long-haired breeds may require more frequent visits, while short-haired breeds might need less. Our groomers can recommend a personalized schedule during your first visit."
  },
  {
    question: "Do you offer any spa packages?",
    answer: "Yes! We offer several luxurious spa packages designed to pamper your pet. Our most popular is the 'Royal Treatment' which includes a hydrating bath, haircut, nail trimming, ear cleaning, teeth brushing, and a finishing spritz of our signature pet-safe fragrance. Contact us for information about all our spa packages and seasonal specials."
  },
  {
    question: "Is my pet required to have vaccinations?",
    answer: "For the safety of all pets in our care, we require proof of current rabies, distemper, and bordetella (kennel cough) vaccinations for dogs. Cats should be current on rabies and FVRCP. If your pet has a medical reason they cannot be vaccinated, please let us know, and we can discuss accommodations."
  },
  {
    question: "How long does a grooming session take?",
    answer: "Most grooming sessions take between 1-3 hours, depending on your pet's size, coat condition, and the services requested. We don't rush the process to ensure each pet receives thorough, gentle care. For the comfort of your pet, we try to complete the grooming in one session rather than extending it over a longer period."
  },
  {
    question: "Can I stay with my pet during grooming?",
    answer: "While we understand your concern, we generally find that pets are calmer and better behaved when their owners aren't present. However, for pets with special needs or extreme anxiety, we can discuss arrangements for you to stay during certain parts of the process. Feel free to discuss your pet's specific needs with us."
  },
];

const FAQ = () => {
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
      id="faq" 
      ref={sectionRef}
      className="py-20 bg-pawsh-white"
    >
      <div className="container-pawsh max-w-4xl">
        <h2 className={cn(
          "section-title",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}>
          Frequently Asked Questions
        </h2>
        <p className={cn(
          "section-subtitle",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.2s"}}
        >
          We've compiled answers to some of the most common questions we receive.
        </p>

        <div className={cn(
          "mt-12",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.3s"}}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-pawsh-gold/30">
                <AccordionTrigger className="text-lg font-medium py-4 hover:text-pawsh-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground py-4 px-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className={cn(
          "mt-12 text-center",
          isVisible ? "animate-slide-up" : "opacity-0"
        )}
        style={{animationDelay: "0.5s"}}
        >
          <p className="mb-6 text-muted-foreground">
            Still have questions? We're happy to help!
          </p>
          <button className="btn-pawsh">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
