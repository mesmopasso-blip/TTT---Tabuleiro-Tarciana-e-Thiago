
export type TabType = 'roleta' | 'dado' | 'pontuacão';

export interface ScoreState {
  player1: { yellow: number; green: number };
  player2: { yellow: number; green: number };
}

export interface RouletteSection {
  text: string;
  isGood: boolean;
}
