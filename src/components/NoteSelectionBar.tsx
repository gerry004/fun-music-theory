"use client"

import React from 'react';

interface NoteSelectionBarProps {
  selectedNote: string | null;
  onNoteSelect: (note: string) => void;
  disabled?: boolean;
}

export const NoteSelectionBar = ({ selectedNote, onNoteSelect, disabled = false }: NoteSelectionBarProps) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {notes.map((note) => (
          <button
            key={note}
            onClick={() => onNoteSelect(note)}
            disabled={disabled}
            className={`px-6 py-3 rounded-lg transition-colors ${
              selectedNote === note
                ? 'bg-blue-500 text-white'
                : disabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}; 