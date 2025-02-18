export type GameState = 'playing' | 'completed' | 'over';

export interface GameScore {
  correct: number;
  incorrect: number;
} 