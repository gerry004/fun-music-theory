"use client"

import React, { useState, useEffect } from 'react';
import { GameLayout } from './GameLayout';
import { NoteSelectionBar } from './NoteSelectionBar';
import MusicStaff from './MusicStaff';
import { Modal } from './Modal';

const TOTAL_QUESTIONS = 15;
const INITIAL_LIVES = 3;

export const ReadNotesGame = () => {
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'over'>('playing');
  const [currentNote, setCurrentNote] = useState<string>('');
  
  // Reference to MusicStaff component
  const staffRef = React.useRef<{ generateNew: () => void; getCurrentNote: () => string; } | null>(null);

  const progress = (questionNumber - 1) / TOTAL_QUESTIONS * 100;

  const handleNoteSelect = (note: string) => {
    setSelectedNote(note);
  };

  const handleSubmit = () => {
    if (!selectedNote) return;

    const isCorrect = selectedNote === currentNote;

    if (isCorrect) {
      setScore(score + 1);
      // Show success animation
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        setGameState('over');
        return;
      }
      // Show failure animation
    }

    if (questionNumber >= TOTAL_QUESTIONS) {
      setGameState('completed');
      return;
    }

    setQuestionNumber(questionNumber + 1);
    setSelectedNote(null);
    staffRef.current?.generateNew();
    setCurrentNote(staffRef.current?.getCurrentNote() || '');
  };

  const handleExit = () => setShowExitModal(true);
  const handleExitConfirm = () => {
    // Navigate to home
  };
  const handleExitCancel = () => setShowExitModal(false);

  const handleRestart = () => {
    setLives(INITIAL_LIVES);
    setScore(0);
    setQuestionNumber(1);
    setSelectedNote(null);
    setGameState('playing');
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
        <MusicStaff
          ref={staffRef}
          onNoteChange={(note) => setCurrentNote(note)}
          showAnswer={false}
        />
        <NoteSelectionBar
          selectedNote={selectedNote}
          onNoteSelect={handleNoteSelect}
          onSubmit={handleSubmit}
        />
      </GameLayout>

      {/* Exit Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={handleExitCancel}
        title="Exit Game?"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={handleExitCancel}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Keep Playing
          </button>
          <button
            onClick={handleExitConfirm}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            End Session
          </button>
        </div>
      </Modal>

      {/* Game Over/Completion Modal */}
      <Modal
        isOpen={gameState !== 'playing'}
        onClose={() => {}}
        title={gameState === 'completed' ? 'Game Completed!' : 'Game Over'}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-xl mb-2">Score: {score}/{TOTAL_QUESTIONS}</p>
            <p className="text-gray-600">
              {gameState === 'completed' 
                ? `You got ${score} correct answers!` 
                : 'Better luck next time!'}
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