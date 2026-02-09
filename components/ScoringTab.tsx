
import React from 'react';
import { ScoreState } from '../types';
import { Plus, Minus, User } from 'lucide-react';
import { COLORS } from '../constants';

interface ScoringTabProps {
  scores: ScoreState;
  setScores: React.Dispatch<React.SetStateAction<ScoreState>>;
  onScoreChange: (delta: number) => void;
}

const ScoringTab: React.FC<ScoringTabProps> = ({ scores, setScores, onScoreChange }) => {
  const updateScore = (player: 'player1' | 'player2', type: 'yellow' | 'green', delta: number) => {
    setScores(prev => {
      const newVal = Math.max(0, prev[player][type] + delta);
      if (newVal !== prev[player][type]) {
        onScoreChange(delta);
      }
      return {
        ...prev,
        [player]: {
          ...prev[player],
          [type]: newVal
        }
      };
    });
  };

  const PlayerCard = ({ id, label, score }: { id: 'player1' | 'player2'; label: string; score: typeof scores.player1 }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-10 shadow-2xl border border-purple-100 w-full flex flex-col gap-8 transition-transform hover:translate-y-[-4px]">
      <div className="flex items-center gap-5 border-b border-purple-50 pb-6">
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
          <User size={30} />
        </div>
        <h3 className="text-3xl font-bold text-purple-600 font-romantic">{label}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Yellow Counter */}
        <div className="flex flex-col items-center gap-5">
          <div 
            className="w-24 h-24 rounded-full border-[6px] shadow-2xl flex items-center justify-center text-4xl font-black transition-all hover:scale-110"
            style={{ backgroundColor: COLORS.yellow + '20', borderColor: COLORS.yellow, color: '#917900' }}
          >
            {score.yellow}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => updateScore(id, 'yellow', -1)}
              className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-gray-100"
            >
              <Minus size={20} />
            </button>
            <span className="text-xs font-black text-gray-500 uppercase tracking-tighter">Amarelo</span>
            <button 
              onClick={() => updateScore(id, 'yellow', 1)}
              className="p-3 bg-purple-600 text-white hover:bg-purple-700 rounded-xl transition-all shadow-lg hover:shadow-purple-200 active:scale-90"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Green Counter */}
        <div className="flex flex-col items-center gap-5">
          <div 
            className="w-24 h-24 rounded-full border-[6px] shadow-2xl flex items-center justify-center text-4xl font-black transition-all hover:scale-110"
            style={{ backgroundColor: COLORS.green + '20', borderColor: COLORS.green, color: '#1b5e20' }}
          >
            {score.green}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => updateScore(id, 'green', -1)}
              className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-gray-100"
            >
              <Minus size={20} />
            </button>
            <span className="text-xs font-black text-gray-500 uppercase tracking-tighter">Verde</span>
            <button 
              onClick={() => updateScore(id, 'green', 1)}
              className="p-3 bg-purple-600 text-white hover:bg-purple-700 rounded-xl transition-all shadow-lg hover:shadow-purple-200 active:scale-90"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full justify-center items-start py-6">
      <PlayerCard id="player1" label="Jogador 1" score={scores.player1} />
      <PlayerCard id="player2" label="Jogador 2" score={scores.player2} />
    </div>
  );
};

export default ScoringTab;
