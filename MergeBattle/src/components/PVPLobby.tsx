import { useState } from 'react';
import { ArrowLeft, Swords, Loader2 } from 'lucide-react';

interface PVPLobbyProps {
  onBack: () => void;
}

type Rank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

const rankColors: Record<Rank, string> = {
  D: '#9E9E9E',
  C: '#2196F3',
  B: '#4CAF50',
  A: '#9C27B0',
  S: '#FF9800',
  SS: '#F44336',
  SSS: 'linear-gradient(135deg, #FF00FF, #00FFFF, #FFFF00)',
};

export function PVPLobby({ onBack }: PVPLobbyProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [currentRank] = useState<Rank>('B');
  const [wins] = useState(12);
  const [winsNeeded] = useState(20);

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Rank Display */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8">
        <div className="text-center">
          <div className="text-[#CCCCCC] mb-4">Ваш Ранг</div>
          <div
            className="inline-block px-12 py-6 rounded-2xl mb-4"
            style={{
              background: rankColors[currentRank],
              boxShadow: `0 0 40px ${rankColors[currentRank]}60`,
            }}
          >
            <span className="text-white" style={{ fontSize: '72px', fontWeight: '900' }}>
              {currentRank}
            </span>
          </div>
          <div className="text-[#CCCCCC] mb-2">
            Прогресс до ранга C-
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 mb-2">
            <div
              className="bg-[#00E5FF] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(wins / winsNeeded) * 100}%` }}
            />
          </div>
          <div className="text-white" style={{ fontSize: '18px', fontWeight: '600' }}>
            {wins}/{winsNeeded} побед
          </div>
        </div>
      </div>

      {/* Find Match Button */}
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={() => setIsSearching(!isSearching)}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#4361EE] hover:from-[#4361EE] hover:to-[#00E5FF] transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(0, 229, 255, 0.5)',
            animation: isSearching ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-16 h-16 text-white mb-4 animate-spin" />
              <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
                Поиск...
              </span>
            </>
          ) : (
            <>
              <Swords className="w-16 h-16 text-white mb-4" />
              <span className="text-white" style={{ fontSize: '28px', fontWeight: '900' }}>
                GO
              </span>
              <span className="text-white/80 mt-2">Найти противника</span>
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 text-center">
          <div className="text-[#CCCCCC]">Победы</div>
          <div className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
            127
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 text-center">
          <div className="text-[#CCCCCC]">Поражения</div>
          <div className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
            45
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 text-center">
          <div className="text-[#CCCCCC]">Серия</div>
          <div className="text-[#00E5FF]" style={{ fontSize: '24px', fontWeight: '700' }}>
            5
          </div>
        </div>
      </div>
    </div>
  );
}
