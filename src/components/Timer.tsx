"use client"

import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: (timeLeft: number | ((prev: number) => number)) => void;
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft, duration, onTimeUp, isActive }) => {

  useEffect(() => {
    // Reset timer when isActive changes to true
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [isActive, duration, setTimeLeft]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTime = prev - 1;
          if (newTime === 0) {
            // Call onTimeUp in the next tick to avoid state updates during render
            setTimeout(onTimeUp, 0);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, isActive, onTimeUp, setTimeLeft]);

  return (
    <div className="game-status" aria-label={`${timeLeft} seconds remaining`}>
      <TimerIcon size={20} />
      <span>{timeLeft}s</span>
    </div>
  );
};
