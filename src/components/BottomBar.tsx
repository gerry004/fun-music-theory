"use client"

import React from 'react';

interface BottomBarProps {
  isCorrect: boolean | null;
  correctSolution?: string;
  onCheck: () => void;
  onContinue: () => void;
  showCheck: boolean;
}

export const BottomBar = ({ isCorrect, correctSolution, onCheck, onContinue, showCheck }: BottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className={`w-full ${
        isCorrect === true ? 'h-1 bg-green-500' : 
        isCorrect === false ? 'h-1 bg-red-500' : 
        'border-t border-gray-200'
      }`} />
      
      <div className="p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-end gap-4">
          <div className="flex-grow">
            {isCorrect !== null && (
              <div className="flex items-center gap-4">
                {isCorrect ? (
                  <div className="flex items-center text-green-500">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span className="text-lg font-bold">Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                    <div>
                      <span className="text-lg font-bold">Correct solution:</span>
                      <span className="ml-2">{correctSolution}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={isCorrect !== null ? onContinue : onCheck}
            disabled={!showCheck && isCorrect === null}
            className={`px-8 py-3 rounded-lg font-bold transition-colors ${
              isCorrect === null
                ? showCheck
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isCorrect
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isCorrect !== null ? 'CONTINUE' : 'CHECK'}
          </button>
        </div>
      </div>
    </div>
  );
}; 