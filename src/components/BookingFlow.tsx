
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animate, setAnimate] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps: Step[] = [
    {
      title: "Choose Your Service",
      subtitle: "Select from our premium grooming options",
      icon: <Calendar className="h-10 w-10 text-pawsh-gold" />,
      component: <ServiceSelector />
    },
    {
      title: "Pick a Date",
      subtitle: "Select the perfect day for your pet's spa day",
      icon: <Calendar className="h-10 w-10 text-pawsh-gold" />,
      component: <DatePicker />
    },
    {
      title: "Select Drop-off Time",
      subtitle: "Choose a convenient time for you and your pet",
      icon: <Clock className="h-10 w-10 text-pawsh-gold" />,
      component: <TimePicker />
    }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setAnimate('next');
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setAnimate('prev');
      setCurrentStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    // Add scroll animation when the component comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 300 : -300,
      opacity: 0,
      rotateY: direction === 'next' ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
      }
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? -300 : 300,
      opacity: 0,
      rotateY: direction === 'next' ? -15 : 15,
      transition: {
        duration: 0.5,
      }
    })
  };

  return (
    <section 
      id="booking-flow"
      className="py-20 bg-pawsh-pink/10"
      ref={containerRef}
    >
      <div className="container-pawsh opacity-0">
        <h2 className="section-title">
          Book Your Pet's Spa Day
        </h2>
        <p className="section-subtitle">
          Treat your furry friend to a day of pampering in just three simple steps
        </p>
        
        <div className="mt-16 max-w-3xl mx-auto">
          {/* Progress indicators */}
          <div className="flex justify-between mb-12 relative">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step indicator */}
                <div className="flex flex-col items-center relative z-10">
                  <motion.div 
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      currentStep >= index ? "bg-pawsh-gold" : "bg-gray-200"
                    )}
                    whileHover={{ scale: 1.1 }}
                    animate={currentStep >= index ? { 
                      scale: [1, 1.2, 1],
                      backgroundColor: ["#d4b886", "#e5c89a", "#d4b886"]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h4 className="font-medium text-sm md:text-base">{step.title}</h4>
                  <p className="text-muted-foreground text-xs md:text-sm text-center max-w-[100px] md:max-w-[150px]">
                    {step.subtitle}
                  </p>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center">
                    <div className="h-0.5 w-full bg-gray-200 relative">
                      <motion.div 
                        className="absolute left-0 top-0 h-full bg-pawsh-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: currentStep > index ? "100%" : "0%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Content area with animation */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="relative h-80">
              <AnimatePresence custom={animate} initial={false}>
                <motion.div
                  key={currentStep}
                  custom={animate}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 p-6"
                  style={{ perspective: 1000 }}
                >
                  {steps[currentStep].component}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation buttons */}
            <div className="bg-gray-50 p-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              
              <Button 
                className="bg-pawsh-gold hover:bg-pawsh-gold/90 flex items-center" 
                onClick={nextStep}
              >
                {currentStep < steps.length - 1 ? (
                  <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Service selector component
const ServiceSelector = () => {
  const services = [
    { id: 1, name: "Basic Groom", price: "$45", duration: "1 hour" },
    { id: 2, name: "Full Spa Treatment", price: "$75", duration: "2 hours" },
    { id: 3, name: "Deluxe Pamper Package", price: "$120", duration: "3 hours" }
  ];
  
  const [selected, setSelected] = useState<number | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      <h3 className="font-playfair text-xl mb-4">Select Your Service</h3>
      <div className="space-y-3 flex-1 overflow-auto">
        {services.map(service => (
          <motion.div 
            key={service.id}
            className={cn(
              "p-4 border rounded-lg cursor-pointer",
              selected === service.id ? "border-pawsh-gold bg-pawsh-gold/5" : "border-gray-200"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(service.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{service.name}</span>
              <span>{service.price}</span>
            </div>
            <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Date picker component
const DatePicker = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  
  // Get the full name of the current month
  const monthName = today.toLocaleString('default', { month: 'long' });
  
  return (
    <div className="h-full">
      <h3 className="font-playfair text-xl mb-4">Select a Date</h3>
      
      <div className="text-center mb-4">
        <h4 className="font-medium">{monthName} {today.getFullYear()}</h4>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className="h-8" />
        ))}
        
        {days.map(day => {
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          const isToday = today.getDate() === day;
          const isSelected = selectedDate?.getDate() === day;
          const isPast = date < today && !isToday;
          
          return (
            <motion.div 
              key={day}
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center mx-auto",
                isSelected ? "bg-pawsh-gold text-white" : 
                isToday ? "bg-pawsh-pink/20 text-black" : 
                isPast ? "text-gray-300" : "text-black hover:bg-pawsh-gold/10",
                isPast ? "cursor-not-allowed" : "cursor-pointer"
              )}
              whileHover={!isPast ? { scale: 1.1 } : {}}
              whileTap={!isPast ? { scale: 0.9 } : {}}
              onClick={() => !isPast && setSelectedDate(date)}
            >
              {day}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Time picker component
const TimePicker = () => {
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];
  
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  return (
    <div className="h-full">
      <h3 className="font-playfair text-xl mb-4">Choose a Time</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map(time => (
          <motion.div
            key={time}
            className={cn(
              "p-2 border rounded text-center cursor-pointer",
              selectedTime === time ? "bg-pawsh-gold text-white border-pawsh-gold" : "border-gray-200 hover:border-pawsh-gold"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingFlow;
