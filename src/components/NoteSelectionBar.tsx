"use client"

import React from 'react';

interface NoteSelectionBarProps {
  selectedNote: string | null;
  onNoteSelect: (note: string) => void;
  onSubmit: () => void;
}

export const NoteSelectionBar = ({ selectedNote, onNoteSelect, onSubmit }: NoteSelectionBarProps) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {notes.map((note) => (
            <button
              key={note}
              onClick={() => onNoteSelect(note)}
              className={`px-4 py-2 rounded ${
                selectedNote === note
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
        {selectedNote && (
          <button
            onClick={onSubmit}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}; 