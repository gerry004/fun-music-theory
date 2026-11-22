"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameLayout } from './GameLayout';
import { NoteSelectionBar } from './NoteSelectionBar';
import { BottomBar } from './BottomBar';
import MusicStaff from './MusicStaff';
import { Modal } from './Modal';

const TOTAL_QUESTIONS = 15;
const INITIAL_LIVES = 5;

export const ReadNotesGame = () => {
  const router = useRouter();
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'over'>('playing');
  const [currentNote, setCurrentNote] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Reference to MusicStaff component
  const staffRef = React.useRef<{ generateNew: () => void; getCurrentNote: () => string; } | null>(null);

  const progress = (questionNumber - 1) / TOTAL_QUESTIONS * 100;

  const handleNoteSelect = (note: string) => {
    setSelectedNote(note);
  };

  const handleCheck = () => {
    if (!selectedNote) return;

    const isAnswerCorrect = selectedNote === currentNote;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        setGameState('over');
      }
    }
  };

  const handleContinue = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setGameState('completed');
      return;
    }

    setQuestionNumber(questionNumber + 1);
    setSelectedNote(null);
    setIsCorrect(null);
    staffRef.current?.generateNew();
    setCurrentNote(staffRef.current?.getCurrentNote() || '');
  };

  const handleExit = () => setShowExitModal(true);
  const handleExitConfirm = () => {
    router.push('/');
  };
  const handleExitCancel = () => setShowExitModal(false);

  const handleRestart = () => {
    setLives(INITIAL_LIVES);
    setScore(0);
    setQuestionNumber(1);
    setSelectedNote(null);
    setGameState('playing');
    setIsCorrect(null);
    staffRef.current?.generateNew();
    setCurrentNote(staffRef.current?.getCurrentNote() || '');
  };

  return (
    <>
      <GameLayout
        lives={lives}
        progress={progress}
        onExit={handleExit}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black">What's the name of this note?</h2>
        </div>
        <MusicStaff
          ref={staffRef}
          onNoteChange={(note) => setCurrentNote(note)}
          showAnswer={false}
        />
        <NoteSelectionBar
          selectedNote={selectedNote}
          onNoteSelect={handleNoteSelect}
          disabled={isCorrect !== null}
        />
      </GameLayout>

      <BottomBar
        isCorrect={isCorrect}
        correctSolution={isCorrect === false ? currentNote : undefined}
        onCheck={handleCheck}
        onContinue={handleContinue}
        showCheck={selectedNote !== null}
      />

      {/* Exit Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={handleExitCancel}
        title="Leaving so soon?"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={handleExitCancel}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          >
            Keep Playing
          </button>
          <button
            onClick={handleExitConfirm}
            className="px-4 py-2 text-red-500 font-semibold rounded"
          >
            End Session
          </button>
        </div>
      </Modal>

      {/* Game Over/Completion Modal */}
      <Modal
        isOpen={gameState !== 'playing'}
        onClose={() => {}}
        title={gameState === 'completed' ? 'Congratulations!' : 'You Ran Out of Lives'}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-xl mb-2">Score: {score}/{TOTAL_QUESTIONS}</p>
            <p className="text-gray-600">
              {gameState === 'completed' 
                ? `You got ${score} correct answers!` 
                : 'Try again!'}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play Again
          </button>
          <button
            onClick={handleExitConfirm}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Return to Home
          </button>
        </div>
      </Modal>
    </>
  );
}; 