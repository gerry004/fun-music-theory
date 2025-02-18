"use client"

import { useState, useEffect } from 'react';

const TREBLE_NOTE_TO_Y_MULTIPLE_MAP = {
  "-1": "G",
  "0": "F",
  "1": "E",
  "2": "D",
  "3": "C",
  "4": "B",
  "5": "A",
  "6": "G",
  "7": "F",
  "8": "E",
  "9": "D",
}

const BASS_NOTE_TO_Y_MULTIPLE_MAP = {
  "-1": "B",
  "0": "A",
  "1": "G",
  "2": "F",
  "3": "E",
  "4": "D",
  "5": "C",
  "6": "B",
  "7": "A",
  "8": "G",
  "9": "F",
}

const MusicStaff = () => {
  // Staff configuration
  const staffWidth = 600;
  const staffHeight = 300;
  const lineSpacing = 20;
  const staffStartY = 70;
  const centerX = staffWidth / 1.8;

  // Use useState to store the random note and clef type
  const [randomNote, setRandomNote] = useState<number>(0);
  const [isBassTreble, setIsBassTreble] = useState<'treble' | 'bass'>('treble');
  
  // Function to generate new random note and clef
  const generateNew = () => {
    setRandomNote(Math.floor(Math.random() * 10) - 1);
    setIsBassTreble(Math.random() < 0.5 ? 'treble' : 'bass');
  };
  
  // Generate random note and clef on client-side only for initial render
  useEffect(() => {
    generateNew();
  }, []);

  // Convert the random note to string and get the note letter based on current clef
  const randomNoteString = randomNote.toString();
  const noteMap = isBassTreble === 'treble' ? TREBLE_NOTE_TO_Y_MULTIPLE_MAP : BASS_NOTE_TO_Y_MULTIPLE_MAP;
  const randomNoteLetter = noteMap[randomNoteString as keyof typeof TREBLE_NOTE_TO_Y_MULTIPLE_MAP];
  const noteY = staffStartY + (lineSpacing * randomNote);
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <svg 
        viewBox={`0 0 ${staffWidth} ${staffHeight}`}
        className="w-full h-auto border border-gray-200 bg-white"
      >
        {isBassTreble === 'treble' ? (
          // Treble Clef
          <g transform={`translate(-20, ${staffStartY - 45}) scale(0.9)`}>
            <path 
              d="M156.716,61.478c-4.111,6.276-8.881,11.511-14.212,15.609l-8.728,6.962c-13.339,11.855-22.937,21.433-28.542,28.464 c-10.209,12.788-15.806,25.779-16.65,38.611c-0.942,14.473,3.187,28.21,12.275,40.84c9.636,13.458,21.8,20.754,36.164,21.69 c3.291,0.218,6.897,0.182,9.896-0.015l-1.121-10.104c-2.09,0.192-4.306,0.223-6.628,0.068c-9.437-0.617-17.864-4.511-25.064-11.573 c-7.524-7.333-10.895-15.415-10.287-24.7c1.149-17.59,12.562-35.004,33.925-51.792l9.543-7.599 c8.394-7.174,15.192-16.191,20.216-26.825c4.971-10.556,7.886-21.983,8.673-33.96c0.466-7.037-0.513-15.775-2.874-25.965 c-3.241-13.839-7.854-20.765-14.136-21.179c-2.232-0.138-4.676,0.986-7.658,3.617c-7.252,6.548-12.523,14.481-15.683,23.542 c-2.438,6.926-4.057,16.189-4.805,27.529c-0.313,4.72,0.313,13.438,1.805,23.962l8.844-8.192c-0.028-1.183,0.005-2.413,0.096-3.703 c0.466-7.221,2.289-15.062,5.394-23.293c3.956-10.296,7.689-13.409,10.133-14.204c0.668-0.218,1.32-0.298,2.015-0.254 c3.185,0.212,6.358,1.559,5.815,9.979C164.664,46.132,161.831,53.693,156.716,61.478z M164.55,209.161c5.728-2.568,10.621-6.478,14.576-11.651c5.055-6.561,7.897-14.316,8.467-23.047 c0.72-10.719-1.854-20.438-7.617-28.895c-6.322-9.264-14.98-14.317-25.745-15.026c-1.232-0.081-2.543-0.075-3.895,0.025 l-2.304-17.191l-9.668,7.112l1.483,12.194c-5.789,2.393-10.827,6.17-15.017,11.255c-4.823,5.924-7.508,12.443-7.964,19.382 c-0.466,7.208,1.142,13.81,4.782,19.583c1.895,3.081,4.507,5.82,7.498,8.058c4.906,3.65,10.563,3.376,11.459,1.393 c0.906-1.983-2.455-5.095-5.09-9.248c-1.502-2.351-2.242-5.173-2.242-8.497c0-7.053,4.256-13.116,10.317-15.799l5.673,44.211 l1.325,10.258c0.864,4.873,1.719,9.725,2.537,14.52c1,6.488,1.352,12.112,1.041,16.715c-0.419,6.375-2.408,11.584-5.919,15.493 c-2.234,2.485-4.844,4.055-7.795,4.925c3.961-3.962,6.414-9.43,6.414-15.478c0-12.075-9.792-21.872-21.87-21.872 c-3.353,0-6.491,0.812-9.329,2.159c-0.36,0.155-0.699,0.388-1.054,0.574c-0.779,0.425-1.559,0.85-2.286,1.362 c-0.249,0.187-0.487,0.403-0.732,0.605c-4.888,3.816-8.091,9.616-8.375,16.229c0,0.01-0.011,0.021-0.011,0.031 c0,0.005,0,0.01,0,0.016c-0.013,0.311-0.09,0.59-0.09,0.896c0,0.259,0.067,0.492,0.078,0.74 c-0.011,7.084,2.933,13.179,8.839,18.118c5.584,4.666,12.277,7.28,19.892,7.777c4.327,0.28,8.505-0.217,12.407-1.485 c3.189-1.041,6.275-2.62,9.149-4.687c6.96-5.022,10.75-11.584,11.272-19.532c0.399-6.063,0.094-13.235-0.937-21.411l-2.838-18.429 l-7.156-52.899c7.984,1.532,14.027,8.543,14.027,16.968c0,5.986-1.937,15.431-5.551,20.376L164.55,209.161z"
              fill="black"
            />
          </g>
        ) : (
          // Bass Clef
          <g transform={`translate(35, ${staffStartY}) scale(0.3)`}>
            <path
              d="M176.014,0l-2.823,0.01C89.091,1.164,20.78,63.557,15.904,118.564c-3.125,35.072,4.693,63.941,22.568,83.494 c16.307,17.803,39.765,26.836,69.727,26.836c31.095,0,61.603-29.77,61.603-60.106c0-30.803-25.076-55.869-55.888-55.869 c-16.569,0-27.575,7.323-34.858,12.179c-2.853,1.892-5.796,3.854-7.121,3.854c-0.446,0-1.477-1.184-2.458-5.635 c-3.399-15.335,1.902-33.644,14.212-48.98c10.399-12.978,34.858-34.726,81.876-34.726c65.67,0,101.833,52.894,101.833,148.952 c0,192.852-165.703,271.845-216.483,291.459c-10.398,4.016-13.778,12.716-12.492,19.553C39.828,507.002,45.947,512,53.686,512 c2.448,0,5.037-0.496,7.657-1.477l5.807-2.165C262.916,435.82,362.19,326.247,362.19,182.648C362.19,57.164,265.688,0,176.014,0z M455.486,126.84c22.771,0,41.282-18.522,41.282-41.292c0-22.76-18.512-41.271-41.282-41.271 c-22.759,0-41.281,18.511-41.281,41.271C414.205,108.318,432.726,126.84,455.486,126.84z M455.486,211.365c-22.759,0-41.281,18.522-41.281,41.282c0,22.77,18.522,41.281,41.281,41.281 c22.771,0,41.282-18.511,41.282-41.281C496.768,229.887,478.256,211.365,455.486,211.365z"
              fill="black"
            />
          </g>
        )}

        {/* Single large note */}
        <g>
          <ellipse
            cx={centerX}
            cy={noteY}
            rx="25"
            ry="17"
            transform={`rotate(-20 ${centerX} ${noteY})`}
            stroke="black"
            strokeWidth="0"
            fill="black"
          />
          <ellipse
            cx={centerX}
            cy={noteY}
            rx="14"
            ry="12"
            transform={`rotate(-20 ${centerX} ${noteY})`}
            fill="white"
          />
        </g>
        
        {/* Draw the five staff lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`staff-line-${i}`}
            x1="40"
            y1={staffStartY + (i * lineSpacing * 2)}
            x2={staffWidth - 40}
            y2={staffStartY + (i * lineSpacing * 2)}
            stroke="black"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div className="mt-4 flex justify-center text-2xl font-bold">
        {randomNoteLetter}
      </div>
      <div className="mt-4 flex justify-center">
        <button 
          onClick={generateNew}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next Note
        </button>
      </div>
    </div>
  );
};

export default MusicStaff;