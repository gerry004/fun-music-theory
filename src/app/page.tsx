"use client"

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function GameCard({ title, description, href, icon }: GameCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-8 hover:shadow-xl hover:shadow-gray-800/30 transition-all duration-300 flex flex-col items-center">
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-gray-300 text-center mb-8">{description}</p>
      <Link 
        href={href}
        className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-auto"
      >
        Start Game
      </Link>
    </div>
  );
}

export default function Home() {
  const games = [
    {
      title: "Read Notes from Stave",
      description: "Practice reading musical notes from the stave. Choose the correct note name for each position shown.",
      href: "/games/read-notes",
      icon: <BookOpen className="w-12 h-12 text-blue-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">Learn Music Theory</h1>
        <p className="text-gray-300 mt-2">
          Select a game to start learning music theory!
        </p>
      </header>
      
      <main className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              href={game.href}
              icon={game.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}