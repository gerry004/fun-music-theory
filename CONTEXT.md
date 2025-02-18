# Music Theory Learning App Specification
A gamified educational application designed to help children learn music theory through interactive gameplay.

## Application Structure

### Home Screen
The main landing page featuring:
- Header displaying "Learn Music Theory"
- Two game options presented as interactive cards:
  - Play from Note Names
  - Read Notes from Stave

Each game card, when clicked, triggers a modal containing:
- Detailed game description
- "Start Game" button positioned in bottom-right corner

### Read Notes from Stave Game Flow

#### Game Interface Elements
- Navigation Bar:
  - Exit button (X) in top-left corner
  - Progress bar in top-center showing game completion
  - Lives counter with heart icon in top-right
- Game Area
  - Musical stave displaying a single note
  - Note selection options bar at bottom
  - Answer submission interface

- Gameplay Mechanics
  - Note Selection:
    - Available options: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    - Selecting a note reveals the "Check" button in the bottmo right

- Answer Validation
  - Correct answers trigger:
    - Success animation
    - Green checkmark indicator 

  - Incorrect answers trigger:
    - Failure animation
    - Red cross indicator
    - Reduction in remaining lives    

- Game Progress
  - Total of 15 questions per session
  - Progress tracked via top progress bar

- Game Exit Flows
  - Manual Exit:
    - Clicking X button displays modal with options:
      - "Keep Playing"
      - "End Session" (returns to home screen)

  - Game Completion:
    - After 15 questions, displays results screen showing:
      - Number of correct answers
      - Number of incorrect answers
      - "Play Again" button
      - "Return to Home" button

  - Game Over:
    - Triggered when all lives are lost
    - Displays game over modal with:
      - "Play Again" button
      - "Return to Home" button

