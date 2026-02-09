
import { RouletteSection } from './types';

export const COLORS = {
  lilac: '#C8A2C8',
  lilacLight: '#F3E5F5',
  red: '#FF4D4D',
  white: '#FFFFFF',
  black: '#1A1A1A',
  yellow: '#FFD700',
  green: '#4CAF50'
};

export const ROULETTE_SECTIONS: RouletteSection[] = [
  { text: "Choveu", isGood: false },
  { text: "Dia ensolarado", isGood: true },
  { text: "A comida estava ruim", isGood: false },
  { text: "A comida estava ótima", isGood: true },
  { text: "Som alto por perto", isGood: false },
  { text: "Brisa legal", isGood: true },
  { text: "Cara feia", isGood: false },
  { text: "Dedada na bochecha", isGood: true },
  { text: "A brincadeira machucou", isGood: false },
  { text: "Sorrisos", isGood: true },
  { text: "Alguém precisou remarcar", isGood: false },
  { text: "Momento incrível", isGood: true },
];

// Mapping to the 15 local audio files provided: 1.mp3, 2.mp3, ..., 15.mp3
export const TRACKS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Música ${i + 1}`,
  url: `${i + 1}.mp3`
}));
