"use client"

import Link from 'next/link';
import { Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NotePosition {
  left: number;
  top: number;
  delay: number;
}

export default function Home() {
  const [notePositions, setNotePositions] = useState<NotePosition[]>([]);

  useEffect(() => {
    setNotePositions(
      Array(6).fill(0).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-400 text-white font-sans antialiased">
      {/* Floating music notes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {notePositions.map((pos, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              opacity: 0.1
            }}
          >
            <Music className="w-16 h-16" />
          </div>
        ))}
      </div>
      
      <header className="relative py-16 text-center">
        <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Learn Music Theory
        </h1>
        <p className="text-2xl text-white/90 font-medium">
          Pick a game to start learning!
        </p>
      </header>
      
      <main className="relative container mx-auto px-4 mt-4">
        <div className="max-w-3xl mx-auto">
          {/* Single Game Card with Two Modes */}
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
            <div className="relative">
              <div className="flex justify-center mb-6 animate-bounce">
                <Music className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center text-white">
                Read the Notes! 🎼
              </h2>
              <p className="text-white/90 text-center mb-8 text-lg">
                Can you identify notes on a music stave? Let's find out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/games/read-notes/lives"
                  className="bg-white/90 text-gray-800 px-6 py-4 rounded-xl 
                    text-lg font-bold hover:scale-105 transition-transform shadow-lg text-center"
                >
                  Play Lives Mode
                  <p className="text-sm font-normal mt-1 text-gray-600">
                    5 lives, 15 questions
                  </p>
                </Link>
                <Link 
                  href="/games/read-notes/timed"
                  className="bg-white/90 text-gray-800 px-6 py-4 rounded-xl 
                    text-lg font-bold hover:scale-105 transition-transform shadow-lg text-center"
                >
                  Play Timed Mode
                  <p className="text-sm font-normal mt-1 text-gray-600">
                    30 seconds challenge
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}