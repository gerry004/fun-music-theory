"use client"

interface NoteSelectionBarProps {
  selectedNote: string | null;
  onNoteSelect: (note: string) => void;
  disabled?: boolean;
}

export const NoteSelectionBar = ({ selectedNote, onNoteSelect, disabled = false }: NoteSelectionBarProps) => {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];

  return (
    <div className="note-options" aria-label="Choose a note">
      {notes.map((note) => (
        <button
          key={note}
          onClick={() => onNoteSelect(note)}
          disabled={disabled}
          className={`note-button ${selectedNote === note ? "is-selected" : ""}`}
          aria-pressed={selectedNote === note}
        >
          {note}
        </button>
      ))}
    </div>
  );
};
