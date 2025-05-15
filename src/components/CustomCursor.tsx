import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverButton, setIsOverButton] = useState(false);
  const [trail, setTrail] = useState<{ x: number, y: number, timestamp: number }[]>([]);
  
  useEffect(() => {
    // Only enable custom cursor on larger screens
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Add position to trail with timestamp
      setTrail(prevTrail => {
        const now = Date.now();
        const newTrail = [...prevTrail, { ...newPosition, timestamp: now }];
        
        // Keep only recent trail points (last 500ms)
        return newTrail.filter(point => now - point.timestamp < 500);
      });
      
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      // Check if the mouse is over a button or link
      const target = e.target as HTMLElement;
      const isTargetClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') !== null || 
        target.closest('a') !== null;
      
      setIsOverButton(isTargetClickable);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver as EventListener);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver as EventListener);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);
  
  // Get current timestamp for trail fade calculation
  const now = Date.now();
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Cursor trail */}
      {trail.map((point, index) => {
        // Calculate the age of this trail point (0 = newest, 1 = oldest)
        const age = (now - point.timestamp) / 500;
        
        // Only render if over buttons or links
        if (!isOverButton) return null;
        
        return (
          <motion.div
            key={`${point.timestamp}-${index}`}
            className="fixed pointer-events-none z-40 rounded-full"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              opacity: 1 - age,
              width: `${12 - age * 6}px`,
              height: `${12 - age * 6}px`,
              backgroundColor: "rgba(212, 184, 134, 0.4)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
      
      {/* Main cursor */}
      <motion.div
        className={`custom-cursor ${isClicking ? 'scale-75' : ''} ${isOverButton ? 'scale-150' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isOverButton ? 'rgba(212, 184, 134, 0.4)' : 'rgba(255, 255, 255, 0.2)'
        }}
        animate={{
          scale: isClicking ? 0.7 : isOverButton ? 1.2 : 1,
          transition: { type: "spring", stiffness: 500, damping: 28 }
        }}
      >
        {isOverButton && (
          <motion.div 
            className="text-[8px] font-medium opacity-70"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            Click
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
