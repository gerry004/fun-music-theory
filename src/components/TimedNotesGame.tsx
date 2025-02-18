"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GameLayout } from './GameLayout';
import { NoteSelectionBar } from './NoteSelectionBar';
import MusicStaff from './MusicStaff';
import { Modal } from './Modal';
import { Timer } from './Timer';
import { GameState, GameScore } from '../types/game';

const GAME_DURATION = 30; // seconds

export const TimedNotesGame = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('playing');
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [score, setScore] = useState<GameScore>({ correct: 0, incorrect: 0 });
  
  const staffRef = useRef<{ generateNew: () => void; getCurrentNote: () => string; } | null>(null);

  const handleNoteSelect = (note: string) => {
    const isCorrect = note === currentNote;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));

    // Generate new note immediately after selection
    staffRef.current?.generateNew();
    setCurrentNote(staffRef.current?.getCurrentNote() || '');
  };

  const handleTimeUp = () => {
    setGameState('completed');
  };
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const handleExit = () => setShowExitModal(true);
  const handleExitConfirm = () => router.push('/');
  const handleExitCancel = () => setShowExitModal(false);

  const handleRestart = () => {
    setScore({ correct: 0, incorrect: 0 });
    setGameState('playing');
    staffRef.current?.generateNew();
    setCurrentNote(staffRef.current?.getCurrentNote() || '');
  };

  return (
    <>
      <GameLayout
        lives={0}
        progress={(GAME_DURATION - timeLeft) / GAME_DURATION * 100}
        onExit={handleExit}
        rightElement={
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            duration={GAME_DURATION} 
            onTimeUp={handleTimeUp}
            isActive={gameState === 'playing'}
          />
        }
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
          selectedNote={null}
          onNoteSelect={handleNoteSelect}
          disabled={gameState !== 'playing'}
        />
      </GameLayout>

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

      {/* Game Completion Modal */}
      <Modal
        isOpen={gameState === 'completed'}
        onClose={() => {}}
        title="Time's Up!"
      >
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-green-600">Correct: {score.correct}</p>
            <p className="text-red-600">Incorrect: {score.incorrect}</p>
            <p className="text-gray-600">Total: {score.correct + score.incorrect}</p>
            <p className="text-gray-600">Accuracy: {((score.correct / (score.correct + score.incorrect)) * 100).toFixed(2)}%</p>
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