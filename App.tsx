
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TabType, ScoreState } from './types';
import { TRACKS, COLORS } from './constants';
import { SkipBack, SkipForward, Volume2, VolumeX, Volume1, Play, Pause, Heart } from 'lucide-react';
import RouletteTab from './components/RouletteTab';
import DiceTab from './components/DiceTab';
import ScoringTab from './components/ScoringTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('roleta');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [scores, setScores] = useState<ScoreState>({
    player1: { yellow: 0, green: 0 },
    player2: { yellow: 0, green: 0 }
  });

  const playSFX = useCallback((type: 'good' | 'bad' | 'spin' | 'point_up' | 'point_down' | 'dice') => {
    const sounds: Record<string, string> = {
      good: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
      bad: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
      spin: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3', // Professional fast ticking wheel sound
      point_up: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
      point_down: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
      dice: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'
    };
    const sfx = new Audio(sounds[type]);
    sfx.volume = isMuted ? 0 : volume;
    sfx.play().catch(() => {});
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback interaction required:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => {
            console.error("Manual playback failed:", e);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbff] text-gray-800 relative overflow-hidden">
      {/* Professional Romantic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Modern Mesh Gradient Effect */}
        <div className="absolute inset-0 bg-[#fdfbff]">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f3e5f5] rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e1bee7] rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#f8f0f9] rounded-full blur-[80px] opacity-50"></div>
        </div>

        {/* Elegant Animated Floating Hearts */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${(i * 10) % 100}%`,
              bottom: `-100px`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              opacity: 0.15
            }}
          >
            <Heart 
              size={20 + Math.random() * 50} 
              fill={i % 2 === 0 ? COLORS.lilac : COLORS.red} 
              color="transparent" 
              className="drop-shadow-sm"
            />
          </div>
        ))}
      </div>

      <header className="bg-white/40 backdrop-blur-2xl border-b border-purple-100 shadow-sm sticky top-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-6xl font-romantic text-purple-600 drop-shadow-md select-none transition-all hover:scale-105 active:scale-95 cursor-default">TTT</h1>
          
          <div className="flex items-center gap-5 bg-white/60 p-2.5 rounded-full px-8 shadow-sm border border-purple-100 backdrop-blur-md">
            <button onClick={handlePrevTrack} className="text-purple-400 hover:text-purple-600 transition-all hover:scale-110 active:scale-75">
              <SkipBack size={26} fill="currentColor" />
            </button>
            <button onClick={togglePlay} className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-300/50 active:scale-90 transform">
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            <button onClick={handleNextTrack} className="text-purple-400 hover:text-purple-600 transition-all hover:scale-110 active:scale-75">
              <SkipForward size={26} fill="currentColor" />
            </button>
            
            <div className="h-8 w-px bg-purple-200 mx-2" />
            
            <button onClick={() => setIsMuted(!isMuted)} className="text-purple-400 hover:text-purple-600 transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={24} /> : volume > 0.5 ? <Volume2 size={24} /> : <Volume1 size={24} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-28 accent-purple-600 cursor-pointer h-2 rounded-lg bg-purple-100/50 appearance-none transition-all hover:bg-purple-200/50"
            />
            <div className="hidden sm:flex flex-col items-center min-w-[90px]">
               <span className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] mb-[-2px]">Musica</span>
               <span className="text-xs font-black text-purple-600 uppercase tracking-tighter">
                {TRACKS[currentTrackIndex].id} / {TRACKS.length}
              </span>
            </div>
          </div>

          <audio 
            ref={audioRef}
            src={TRACKS[currentTrackIndex].url}
            onEnded={handleNextTrack}
          />
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto p-4 z-10 flex flex-col items-center">
        <nav className="flex bg-white/60 backdrop-blur-md rounded-full p-1.5 shadow-lg mb-16 border border-purple-100 mt-8 overflow-hidden">
          {(['roleta', 'dado', 'pontuacão'] as TabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-3 rounded-full font-bold transition-all duration-500 uppercase text-xs tracking-[0.2em] ${
                activeTab === tab ? 'bg-purple-600 text-white shadow-xl scale-105' : 'text-purple-400 hover:text-purple-600 hover:bg-white/50'
              }`}
            >
              {tab === 'pontuacão' ? 'Pontuação' : tab}
            </button>
          ))}
        </nav>

        <div className="w-full flex justify-center py-6 min-h-[500px]">
          {activeTab === 'roleta' && <RouletteTab onResult={playSFX} />}
          {activeTab === 'dado' && <DiceTab onRoll={playSFX} />}
          {activeTab === 'pontuacão' && (
            <ScoringTab 
              scores={scores} 
              setScores={setScores} 
              onScoreChange={(delta) => playSFX(delta > 0 ? 'point_up' : 'point_down')} 
            />
          )}
        </div>
      </main>

      <footer className="p-14 text-center bg-white/20 backdrop-blur-md border-t border-purple-100/50 z-10">
        <p className="text-purple-600 font-romantic text-5xl transition-all duration-300 hover:tracking-wide cursor-default">
          Do seu Ousado para minha Arengueira
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
  );
};

export default App;
