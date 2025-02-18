import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">Learn Music Theory</h1>
      </header>
      
      <main className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GameCard
            title="Read Notes from Stave"
            description="Practice reading musical notes from the stave. Perfect for beginners!"
            href="/games/read-notes"
          />
          <GameCard
            title="Play from Note Names"
            description="Learn to play notes by their names. Great for learning note positions!"
            href="/games/play-notes"
          />
        </div>
      </main>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  href: string;
}

function GameCard({ title, description, href }: GameCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">{description}</p>
      <Link 
        href={href}
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start Game
      </Link>
    </div>
  );
}
