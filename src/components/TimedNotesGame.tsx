"use client"

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GameLayout } from "./GameLayout";
import { NoteSelectionBar } from "./NoteSelectionBar";
import MusicStaff from "./MusicStaff";
import { Modal } from "./Modal";
import { Timer } from "./Timer";
import { GameState, GameScore } from "../types/game";

const GAME_DURATION = 30;

export const TimedNotesGame = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("playing");
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [score, setScore] = useState<GameScore>({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const staffRef = useRef<{ generateNew: () => void; getCurrentNote: () => string } | null>(null);
  const total = score.correct + score.incorrect;
  const accuracy = total === 0 ? 0 : Math.round((score.correct / total) * 100);

  const handleNoteSelect = (note: string) => {
    const answerIsCorrect = note === currentNote;
    setScore((value) => ({
      correct: value.correct + (answerIsCorrect ? 1 : 0),
      incorrect: value.incorrect + (answerIsCorrect ? 0 : 1),
    }));
    staffRef.current?.generateNew();
  };

  const handleRestart = () => {
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(GAME_DURATION);
    setGameState("playing");
    staffRef.current?.generateNew();
  };

  return (
    <>
      <GameLayout
        lives={0}
        progress={((GAME_DURATION - timeLeft) / GAME_DURATION) * 100}
        onExit={() => setShowExitModal(true)}
        rightElement={
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} duration={GAME_DURATION} onTimeUp={() => setGameState("completed")} isActive={gameState === "playing"} />
        }
      >
        <p className="game-kicker">Tempo mode · {total} notes read</p>
        <h1 className="game-question">Read it on the beat.</h1>
        <MusicStaff ref={staffRef} onNoteChange={setCurrentNote} showAnswer={false} />
        <NoteSelectionBar selectedNote={null} onNoteSelect={handleNoteSelect} disabled={gameState !== "playing"} />
      </GameLayout>

      <Modal isOpen={showExitModal} onClose={() => setShowExitModal(false)} title="Pause practice?">
        <p className="hero-intro" style={{ fontSize: 17, margin: "0 0 26px" }}>The clock will keep its place while you decide.</p>
        <div className="modal-actions">
          <button onClick={() => setShowExitModal(false)} className="modal-primary">Keep playing</button>
          <button onClick={() => router.push("/")} className="modal-secondary">End session</button>
        </div>
      </Modal>

      <Modal isOpen={gameState === "completed"} onClose={() => {}} title="Time’s up.">
        <div className="score-grid">
          <div className="score-cell"><span>Correct</span><strong>{score.correct}</strong></div>
          <div className="score-cell"><span>Accuracy</span><strong>{accuracy}%</strong></div>
        </div>
        <div className="modal-actions">
          <button onClick={handleRestart} className="modal-primary">Play again</button>
          <button onClick={() => router.push("/")} className="modal-secondary">Return home</button>
        </div>
      </Modal>
    </>
  );
};
