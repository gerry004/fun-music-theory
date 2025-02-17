"use client"

import React, { useState } from 'react';

const PianoKeyboard = () => {
  const [useFlats, setUseFlats] = useState(false);

  // Define white keys
  const whiteKeys = [
    'C', 'D', 'E', 'F', 'G', 'A', 'B',
    'C', 'D', 'E', 'F', 'G', 'A', 'B'
  ];

  // Get the black key notation based on the toggle state
  const getBlackKeyNotation = (note: string) => {
    const sharpToFlat = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb'
    };
    return useFlats ? sharpToFlat[`${note}#` as keyof typeof sharpToFlat] : `${note}#`;
  };

  const getBlackKeyOffset = (index: number) => {
    const keyIndex = index % 7;
    if (keyIndex === 2 || keyIndex === 6) return false; // No black key after E and B
    return true;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Toggle button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setUseFlats(!useFlats)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          {useFlats ? "Using ♭ (Flats)" : "Using # (Sharps)"}
        </button>
      </div>

      <div className="relative h-48">
        {/* White keys */}
        <div className="relative h-full flex">
          {whiteKeys.map((note, index) => (
            <div
              key={`white-${note}-${index}`}
              className="relative flex-1 border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-b-md flex items-end justify-center pb-2"
            >
              <span className="text-sm text-gray-500">{note}</span>
              {getBlackKeyOffset(index) && (
                <div
                  className="absolute top-0 right-0 w-8 h-3/5 -mr-4 bg-black hover:bg-gray-800 active:bg-gray-700 cursor-pointer rounded-b-md flex items-end justify-center pb-2 z-10"
                >
                  <span className="text-sm text-white">
                    {note === 'E' ? null : getBlackKeyNotation(note)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard;