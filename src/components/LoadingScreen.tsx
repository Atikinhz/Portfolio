import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2700;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const currentCount = Math.floor(progress * 100);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(animate);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12"
    >
      <div className="flex justify-between items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          Portfolio
        </motion.span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
          {String(count).padStart(3, "0")}
        </div>
        
        <div className="w-full max-w-md h-[3px] bg-stroke/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            style={{ scaleX: count / 100, originX: 0 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
