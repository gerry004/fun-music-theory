"use client"

import React, { useEffect, useState, useLayoutEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive?: boolean;
}

export const Timer = ({ duration, onTimeUp, isActive = true }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev ? prev - 1 : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  if (timeLeft === null) return null;

  return (
    <div className="flex items-center gap-2">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"/>
      </svg>
      <span className="font-mono text-xl">{timeLeft}s</span>
    </div>
  );
}; 