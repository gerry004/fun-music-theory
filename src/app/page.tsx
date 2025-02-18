"use client"

import Link from 'next/link';
import { Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

function GameCard({ title, description, href, icon, color }: GameCardProps) {
  return (
    <div className={`${color} rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}>
      <div className="relative">
        <div className="flex justify-center mb-6 animate-bounce">
          {icon}
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          {title}
        </h2>
        <p className="text-white/90 text-center mb-8 text-lg">
          {description}
        </p>
        <div className="flex justify-center">
          <Link 
            href={href}
            className="inline-block bg-white text-gray-800 px-8 py-4 rounded-full 
              text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Start Game!
          </Link>
        </div>
      </div>
    </div>
  );
}

interface NotePosition {
  left: number;
  top: number;
  delay: number;
}

export default function Home() {
  const [notePositions, setNotePositions] = useState<NotePosition[]>([]);

  useEffect(() => {
    // Generate random positions only on client side
    setNotePositions(
      Array(6).fill(0).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5
      }))
    );
  }, []);

  const games = [
    {
      title: "Read the Notes! 🎼",
      description: "Can you identify what note is on the music staff? Let's find out!",
      href: "/games/read-notes",
      icon: <Music className="w-16 h-16 text-white" />,
      color: "bg-gradient-to-br from-pink-500 to-orange-400"
    }
  ];

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
          Pick a game to start learning music theory!
        </p>
      </header>
      
      <main className="relative container mx-auto px-4 mt-4">
        <div className="max-w-3xl mx-auto">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              href={game.href}
              icon={game.icon}
              color={game.color}
            />
          ))}
        </div>
      </main>
    </div>
  );
}