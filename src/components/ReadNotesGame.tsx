"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GameLayout } from "./GameLayout";
import { NoteSelectionBar } from "./NoteSelectionBar";
import { BottomBar } from "./BottomBar";
import MusicStaff from "./MusicStaff";
import { Modal } from "./Modal";

const TOTAL_QUESTIONS = 15;
const INITIAL_LIVES = 5;

export const ReadNotesGame = () => {
  const router = useRouter();
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [gameState, setGameState] = useState<"playing" | "completed" | "over">("playing");
  const [currentNote, setCurrentNote] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const staffRef = React.useRef<{ generateNew: () => void; getCurrentNote: () => string } | null>(null);

  const progress = ((questionNumber - 1) / TOTAL_QUESTIONS) * 100;

  const handleCheck = () => {
    if (!selectedNote) return;
    const answerIsCorrect = selectedNote === currentNote;
    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      setScore((value) => value + 1);
    } else {
      setLives((value) => {
        if (value <= 1) setGameState("over");
        return value - 1;
      });
    }
  };

  const handleContinue = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setGameState("completed");
      return;
    }
    setQuestionNumber((value) => value + 1);
    setSelectedNote(null);
    setIsCorrect(null);
    staffRef.current?.generateNew();
  };

  const handleRestart = () => {
    setLives(INITIAL_LIVES);
    setScore(0);
    setQuestionNumber(1);
    setSelectedNote(null);
    setGameState("playing");
    setIsCorrect(null);
    staffRef.current?.generateNew();
  };

  return (
    <>
      <GameLayout lives={lives} progress={progress} onExit={() => setShowExitModal(true)}>
        <p className="game-kicker">Lives mode · Note {questionNumber} of {TOTAL_QUESTIONS}</p>
        <h1 className="game-question">What note is this?</h1>
        <MusicStaff ref={staffRef} onNoteChange={setCurrentNote} showAnswer={false} />
        <NoteSelectionBar selectedNote={selectedNote} onNoteSelect={setSelectedNote} disabled={isCorrect !== null} />
      </GameLayout>

      <BottomBar
        isCorrect={isCorrect}
        correctSolution={isCorrect === false ? currentNote : undefined}
        onCheck={handleCheck}
        onContinue={handleContinue}
        showCheck={selectedNote !== null}
      />

      <Modal isOpen={showExitModal} onClose={() => setShowExitModal(false)} title="Pause practice?">
        <p className="hero-intro" style={{ fontSize: 17, margin: "0 0 26px" }}>Your progress in this session won&apos;t be saved.</p>
        <div className="modal-actions">
          <button onClick={() => setShowExitModal(false)} className="modal-primary">Keep playing</button>
          <button onClick={() => router.push("/")} className="modal-secondary">End session</button>
        </div>
      </Modal>

      <Modal isOpen={gameState !== "playing"} onClose={() => {}} title={gameState === "completed" ? "Session complete." : "Out of lives."}>
        <div className="score-grid">
          <div className="score-cell"><span>Score</span><strong>{score}/{TOTAL_QUESTIONS}</strong></div>
          <div className="score-cell"><span>Accuracy</span><strong>{Math.round((score / Math.max(1, questionNumber)) * 100)}%</strong></div>
        </div>
        <div className="modal-actions">
          <button onClick={handleRestart} className="modal-primary">Play again</button>
          <button onClick={() => router.push("/")} className="modal-secondary">Return home</button>
        </div>
      </Modal>
    </>
  );
};
