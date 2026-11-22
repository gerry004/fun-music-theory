"use client"

import { Check, X } from "lucide-react";

interface BottomBarProps {
  isCorrect: boolean | null;
  correctSolution?: string;
  onCheck: () => void;
  onContinue: () => void;
  showCheck: boolean;
}

export const BottomBar = ({ isCorrect, correctSolution, onCheck, onContinue, showCheck }: BottomBarProps) => (
  <div className="answer-bar">
    <div className="answer-inner">
      <div aria-live="polite">
        {isCorrect === true && (
          <div className="feedback feedback-correct">
            <span className="feedback-mark"><Check size={21} strokeWidth={3} /></span>
            <span>That&apos;s it. Nicely read.</span>
          </div>
        )}
        {isCorrect === false && (
          <div className="feedback feedback-wrong">
            <span className="feedback-mark"><X size={21} strokeWidth={3} /></span>
            <span>Almost — the note was {correctSolution}.</span>
          </div>
        )}
      </div>
      <button
        onClick={isCorrect !== null ? onContinue : onCheck}
        disabled={!showCheck && isCorrect === null}
        className={`action-button ${isCorrect === false ? "is-wrong" : ""}`}
      >
        {isCorrect !== null ? "Next note" : "Check note"}
      </button>
    </div>
  </div>
);
