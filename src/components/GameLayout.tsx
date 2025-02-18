"use client"

import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
  lives: number;
  progress: number;
  onExit: () => void;
  rightElement?: React.ReactNode;
}

export const GameLayout = ({ children, lives, progress, onExit, rightElement }: GameLayoutProps) => {
  return (
    <div className="min-h-screen p-4">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Exit Button */}
        <button 
          onClick={onExit}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Right Element (Lives Counter or Timer) */}
        {rightElement || (lives > 0 && (
          <div className="flex items-center space-x-1">
            {[...Array(lives)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ))}
          </div>
        ))}
      </div>

      {/* Game Content */}
      <div className="container mx-auto max-w-4xl">
        {children}
      </div>
    </div>
  );
}; 