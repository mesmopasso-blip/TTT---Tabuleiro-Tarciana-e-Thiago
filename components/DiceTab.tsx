
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface DiceTabProps {
  onRoll: (type: 'dice') => void;
}

const DiceTab: React.FC<DiceTabProps> = ({ onRoll }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    onRoll('dice');

    const newResult = Math.floor(Math.random() * 6) + 1;
    
    // Rotations to land on specific face
    const rotations = {
      1: { x: 0, y: 0 },       // Front
      2: { x: 0, y: -90 },     // Right
      3: { x: 0, y: 180 },     // Back
      4: { x: 0, y: 90 },      // Left
      5: { x: -90, y: 0 },     // Top
      6: { x: 90, y: 0 },      // Bottom
    };

    const finalRot = rotations[newResult as keyof typeof rotations];
    const extraSpins = 3 + Math.floor(Math.random() * 3);
    
    setRotation({ 
      x: finalRot.x + (extraSpins * 360), 
      y: finalRot.y + (extraSpins * 360) 
    });

    setTimeout(() => {
      setIsRolling(false);
      setResult(newResult);
    }, 1000);
  };

  const renderDiceFace = (num: number) => {
    // Professional Dice Heart Patterns
    const patterns: Record<number, string[]> = {
      1: ['center'],
      2: ['top-right', 'bottom-left'],
      3: ['top-right', 'center', 'bottom-left'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'mid-left', 'mid-right', 'bottom-left', 'bottom-right']
    };

    const posClasses: Record<string, string> = {
      'center': 'col-start-2 row-start-2',
      'top-left': 'col-start-1 row-start-1',
      'top-right': 'col-start-3 row-start-1',
      'bottom-left': 'col-start-1 row-start-3',
      'bottom-right': 'col-start-3 row-start-3',
      'mid-left': 'col-start-1 row-start-2',
      'mid-right': 'col-start-3 row-start-2'
    };

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-2 place-items-center">
        {patterns[num].map((pos, idx) => (
          <div key={idx} className={`${posClasses[pos]} text-red-500`}>
            <Heart size={20} fill="#FF4D4D" stroke="none" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-12 py-10">
      <div className="dice-container w-[150px] h-[150px]">
        <div 
          className="dice" 
          style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            width: '150px',
            height: '150px'
          }}
        >
          {/* Faces must be 150x150 for this size */}
          <div className="dice-face dice-face-1 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(1)}</div>
          <div className="dice-face dice-face-2 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(2)}</div>
          <div className="dice-face dice-face-3 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(3)}</div>
          <div className="dice-face dice-face-4 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(4)}</div>
          <div className="dice-face dice-face-5 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(5)}</div>
          <div className="dice-face dice-face-6 !w-[150px] !h-[150px] !translate-z-[75px]">{renderDiceFace(6)}</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-16">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`px-16 py-5 rounded-full font-black text-2xl transition-all shadow-2xl hover:scale-105 active:scale-95 border-b-4 border-red-700 ${
            isRolling ? 'bg-gray-200 text-gray-400 border-gray-300' : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {isRolling ? 'LANÇANDO...' : 'LANÇAR DADO'}
        </button>

        {!isRolling && (
          <div className="text-red-500 font-romantic text-5xl mt-6 animate-pulse drop-shadow-md">
            {result} {result === 1 ? 'Coração' : 'Corações'}
          </div>
        )}
      </div>

      <style>{`
        .dice-face-1 { transform: rotateY(0deg) translateZ(75px); }
        .dice-face-2 { transform: rotateY(90deg) translateZ(75px); }
        .dice-face-3 { transform: rotateY(180deg) translateZ(75px); }
        .dice-face-4 { transform: rotateY(-90deg) translateZ(75px); }
        .dice-face-5 { transform: rotateX(90deg) translateZ(75px); }
        .dice-face-6 { transform: rotateX(-90deg) translateZ(75px); }
      `}</style>
    </div>
  );
};

export default DiceTab;
