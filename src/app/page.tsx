"use client"

import Link from "next/link";
import { Heart, Music2, Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface NotePosition {
  left: number;
  top: number;
  size: number;
  delay: number;
}

const modes = [
  {
    href: "/games/read-notes/lives",
    title: "Lives Mode",
    description: "Take your time and read 15 notes before your 5 lives run out.",
    detail: "15 questions · 5 lives",
    action: "Start Lives Mode",
    icon: Heart,
    iconColor: "text-rose-500",
  },
  {
    href: "/games/read-notes/timed",
    title: "Timed Mode",
    description: "Read as many notes as you can before the clock ends.",
    detail: "30 seconds · Quick play",
    action: "Start Timed Mode",
    icon: Timer,
    iconColor: "text-violet-600",
  },
];

export default function Home() {
  const [notes, setNotes] = useState<NotePosition[]>([]);

  useEffect(() => {
    setNotes(
      Array.from({ length: 7 }, () => ({
        left: Math.random() * 94,
        top: 10 + Math.random() * 80,
        size: 28 + Math.random() * 28,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-200 to-indigo-200 text-indigo-950 antialiased">
      <nav className="relative z-20 rounded-b-3xl bg-gradient-to-r from-violet-700 to-indigo-700 px-6 py-5 shadow-lg sm:px-10">
        <Link href="/" className="text-3xl font-bold tracking-tight text-white" aria-label="Solfa home">
          Solfa
        </Link>
      </nav>

      <main className="relative isolate overflow-hidden px-4 pb-14 pt-12 sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {notes.map((note, index) => (
            <Music2
              key={index}
              className="absolute animate-float text-blue-500/20"
              style={{
                left: `${note.left}%`,
                top: `${note.top}%`,
                width: note.size,
                height: note.size,
                animationDelay: `${note.delay}s`,
              }}
            />
          ))}
        </div>

        <header className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
            Music reading made playful
          </p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-indigo-950 drop-shadow-sm sm:text-6xl lg:text-7xl">
            Learn to read music, one note at a time
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-indigo-900/75 sm:text-2xl">
            Build your note-reading skills with fun, game-based practice.
          </p>
        </header>

        <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:mt-14 lg:grid-cols-2" aria-label="Choose a practice mode">
          {modes.map(({ href, title, description, detail, action, icon: Icon, iconColor }) => (
            <article
              key={href}
              className="group overflow-hidden rounded-[2rem] border-4 border-white/80 bg-amber-50 shadow-[0_14px_35px_rgba(49,46,129,0.18)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative flex min-h-[26rem] flex-col items-center justify-center px-6 py-9 text-center sm:px-10">
                <div className={`mb-3 flex items-center justify-center gap-3 ${iconColor}`}>
                  <Icon className="h-12 w-12" strokeWidth={2.5} fill={title === "Lives Mode" ? "currentColor" : "none"} aria-hidden="true" />
                  <h2 className="text-4xl font-extrabold tracking-tight text-indigo-950 sm:text-5xl">{title}</h2>
                </div>
                <p className="max-w-md text-lg font-medium leading-relaxed text-indigo-950/75 sm:text-xl">{description}</p>
                <p className="mt-5 rounded-full bg-violet-100 px-5 py-2 text-sm font-bold text-violet-800 sm:text-base">{detail}</p>
                <Link
                  href={href}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-700 to-purple-600 px-6 py-4 text-lg font-extrabold text-white shadow-[0_6px_0_#4c1d95] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#4c1d95] focus:outline-none focus:ring-4 focus:ring-violet-300 sm:text-xl"
                >
                  {action}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
