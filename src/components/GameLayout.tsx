"use client"

import React from "react";
import { Heart, X } from "lucide-react";

interface GameLayoutProps {
  children: React.ReactNode;
  lives: number;
  progress: number;
  onExit: () => void;
  rightElement?: React.ReactNode;
}

export const GameLayout = ({ children, lives, progress, onExit, rightElement }: GameLayoutProps) => (
  <main className="game-shell">
    <nav className="game-nav" aria-label="Game controls">
      <button onClick={onExit} className="game-exit" aria-label="Exit game">
        <X size={20} />
      </button>
      <div className="game-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="game-progress-fill" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
      </div>
      {rightElement || (lives > 0 && (
        <div className="game-status" aria-label={`${lives} lives remaining`}>
          <Heart size={20} fill="var(--coral)" color="var(--coral)" />
          <span>× {lives}</span>
        </div>
      ))}
    </nav>
    <div className="game-content">{children}</div>
  </main>
);
