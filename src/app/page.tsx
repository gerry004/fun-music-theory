import Link from "next/link";
import { ArrowUpRight, Heart, Music2, Play, Timer } from "lucide-react";

const modes = [
  {
    href: "/games/read-notes/lives",
    number: "01",
    eyebrow: "Steady practice",
    title: "Lives mode",
    description: "Name 15 notes before your five lives run out. Pause, think, then lock in your answer.",
    meta: "15 notes · 5 lives",
    icon: Heart,
    accent: "coral",
  },
  {
    href: "/games/read-notes/timed",
    number: "02",
    eyebrow: "Quick reflexes",
    title: "Tempo mode",
    description: "Read as many notes as you can in 30 seconds. Trust your eye and your first instinct.",
    meta: "30 seconds · no limit",
    icon: Timer,
    accent: "lime",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="wordmark" aria-label="Solfa home">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Solfa</span>
        </Link>
        <div className="nav-meta">
          <span>Note reading studio</span>
          <span className="nav-dot" aria-hidden="true" />
          <span>Free to play</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Music theory, made playable</p>
          <h1>
            Find your notes.
            <span>Catch the rhythm.</span>
          </h1>
          <p className="hero-intro">
            A tiny practice room for building fluent note reading—one stave, one note, one satisfying answer at a time.
          </p>
          <Link href="/games/read-notes/lives" className="primary-cta">
            <span className="cta-icon"><Play size={18} fill="currentColor" /></span>
            Start a session
            <ArrowUpRight size={20} />
          </Link>
        </div>

        <div className="hero-poster" aria-hidden="true">
          <div className="poster-label">Today&apos;s warm-up</div>
          <div className="poster-staff">
            {[0, 1, 2, 3, 4].map((line) => <span key={line} />)}
            <div className="poster-clef">𝄞</div>
            <div className="poster-note note-one">♪</div>
            <div className="poster-note note-two">●</div>
          </div>
          <div className="poster-footer">
            <span>Treble + bass</span>
            <span>Key of curiosity</span>
          </div>
        </div>
      </section>

      <section className="practice" aria-labelledby="practice-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your pace</p>
            <h2 id="practice-title">Two ways to practise.</h2>
          </div>
          <p>Same seven notes. A different kind of focus.</p>
        </div>

        <div className="mode-grid">
          {modes.map(({ href, number, eyebrow, title, description, meta, icon: Icon, accent }) => (
            <Link href={href} className={`mode-card mode-${accent}`} key={href}>
              <div className="mode-topline">
                <span>{number}</span>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <p className="card-eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <p className="mode-description">{description}</p>
              </div>
              <div className="mode-footer">
                <span>{meta}</span>
                <span className="round-arrow"><ArrowUpRight size={20} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="method" aria-label="How Solfa works">
        <div className="method-title">
          <Music2 size={22} />
          <span>How it works</span>
        </div>
        <ol>
          <li><span>01</span>Read the stave</li>
          <li><span>02</span>Name the note</li>
          <li><span>03</span>Build the reflex</li>
        </ol>
      </section>

      <footer className="site-footer">
        <p>Made for small, regular wins.</p>
        <p>Solfa <span aria-hidden="true">©</span> {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
