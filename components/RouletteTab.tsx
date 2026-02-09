
import React, { useState, useRef } from 'react';
import { ROULETTE_SECTIONS, COLORS } from '../constants';

interface RouletteTabProps {
  onResult: (type: 'good' | 'bad' | 'spin') => void;
}

const RouletteTab: React.FC<RouletteTabProps> = ({ onResult }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [isResultGood, setIsResultGood] = useState<boolean | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResultText(null);
    onResult('spin');

    // Randomize rotation
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1800 + extraDegrees;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      const segmentSize = 30; // 360 / 12
      // We offset the wheel by 15 deg in drawing to center segment 0 at top.
      // So at 0 rotation, segment 0 is at top.
      // Index = floor((360 - rotation % 360 + offset) / 30)
      const normalizedRotation = totalRotation % 360;
      // Because we shifted slices by -15deg, the Top (270deg in SVG) is the center of slice 0 at rotation 0.
      const index = Math.floor((360 - normalizedRotation + 15) % 360 / segmentSize) % 12;
      
      const result = ROULETTE_SECTIONS[index];
      setResultText(result.text);
      setIsResultGood(result.isGood);
      onResult(result.isGood ? 'good' : 'bad');
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-lg">
      <div className="relative">
        {/* Fixed Pointer at the Top */}
        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-red-600 clip-triangle shadow-xl border-t-2 border-white/20" 
             style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
        
        <div 
          ref={wheelRef}
          className="w-[340px] h-[340px] md:w-[500px] md:h-[500px] transition-transform duration-[4000ms] cubic-bezier(0.1, 0, 0.1, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-full border-[12px] border-white bg-white overflow-visible">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodOpacity="0.3"/>
              </filter>
            </defs>
            {ROULETTE_SECTIONS.map((section, i) => {
              // Shift angles by -15 deg to center segment 0 at top (-90deg)
              const startAngle = (i * 30) - 105;
              const endAngle = ((i + 1) * 30) - 105;
              const midAngle = (startAngle + endAngle) / 2;
              
              const color = section.isGood ? COLORS.lilac : COLORS.red;
              const textColor = section.isGood ? COLORS.white : COLORS.black;
              
              const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

              return (
                <g key={i}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    fill={color}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.2"
                  />
                  <g transform={`rotate(${midAngle}, 50, 50)`}>
                    <text
                      x="76"
                      y="51.5"
                      fill={textColor}
                      fontSize="2.4"
                      fontWeight="900"
                      textAnchor="middle"
                      className="select-none uppercase tracking-tighter"
                      filter="url(#shadow)"
                    >
                      {section.text}
                    </text>
                  </g>
                </g>
              );
            })}
            <circle cx="50" cy="50" r="6" fill="white" className="shadow-lg" />
            <circle cx="50" cy="50" r="3" fill="#f3e5f5" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          className={`px-20 py-6 rounded-full font-black text-2xl transition-all shadow-2xl hover:scale-110 active:scale-90 border-b-8 uppercase tracking-widest ${
            isSpinning 
            ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' 
            : 'bg-purple-600 text-white hover:bg-purple-700 border-purple-900 shadow-purple-200'
          }`}
        >
          {isSpinning ? 'Rodando...' : 'Sortear'}
        </button>

        {resultText && (
          <div className={`p-8 rounded-[2.5rem] shadow-2xl border-4 animate-bounce flex flex-col items-center min-w-[280px] ${
            isResultGood ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200'
          }`}>
            <span className={`text-4xl font-romantic font-bold ${isResultGood ? 'text-purple-600' : 'text-red-600'}`}>
              {resultText}
            </span>
            <span className="text-xs font-black text-gray-400 mt-2 uppercase tracking-[0.3em]">
              {isResultGood ? 'Momento Mágico' : 'Que Chatice'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouletteTab;
