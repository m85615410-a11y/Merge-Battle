import { useState } from 'react';
import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import { AvatarWithFrame } from './ui/AvatarWithFrame';

interface LeaderboardProps {
  onBack: () => void;
}

type Tab = 'local' | 'global';
type Rank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

interface Player {
  id: number;
  name: string;
  rank: Rank;
  score: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

const mockPlayers: Player[] = [
  { id: 1, name: 'ProGamer2024', rank: 'SSS', score: 1250000 },
  { id: 2, name: 'MergeKing', rank: 'SS', score: 980000 },
  { id: 3, name: 'TileWarrior', rank: 'SS', score: 850000 },
  { id: 4, name: 'YouPlayer', rank: 'B', score: 420000, isCurrentUser: true },
  { id: 5, name: 'PuzzleMaster', rank: 'A', score: 650000 },
  { id: 6, name: 'GridHero', rank: 'S', score: 780000 },
  { id: 7, name: 'BlockBuster', rank: 'C', score: 320000 },
  { id: 8, name: 'MergeLord', rank: 'A', score: 600000 },
];

const rankColors: Record<Rank, string> = {
  D: '#9E9E9E',
  C: '#2196F3',
  B: '#4CAF50',
  A: '#9C27B0',
  S: '#FF9800',
  SS: '#F44336',
  SSS: '#FFD700',
};

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('global');

  const sortedPlayers = [...mockPlayers].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white ml-4" style={{ fontSize: '28px', fontWeight: '700' }}>
          Лидеры
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
        <button
          onClick={() => setActiveTab('local')}
          className={`flex-1 py-3 rounded-lg transition-all ${
            activeTab === 'local'
              ? 'bg-[#00E5FF] text-white'
              : 'text-[#CCCCCC] hover:text-white'
          }`}
          style={{ fontWeight: '600' }}
        >
          Местный
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-3 rounded-lg transition-all ${
            activeTab === 'global'
              ? 'bg-[#00E5FF] text-white'
              : 'text-[#CCCCCC] hover:text-white'
          }`}
          style={{ fontWeight: '600' }}
        >
          Глобальный
        </button>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {sortedPlayers.map((player, index) => {
          const position = index + 1;
          return (
            <div
              key={player.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border transition-all hover:bg-white/15 ${
                player.isCurrentUser
                  ? 'border-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
                  : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Position */}
                <div className="w-10 h-10 flex items-center justify-center">
                  {position === 1 && (
                    <Trophy className="w-8 h-8 text-[#FFD700]" />
                  )}
                  {position === 2 && (
                    <Medal className="w-8 h-8 text-[#C0C0C0]" />
                  )}
                  {position === 3 && (
                    <Medal className="w-8 h-8 text-[#CD7F32]" />
                  )}
                  {position > 3 && (
                    <span className="text-[#CCCCCC]" style={{ fontSize: '20px', fontWeight: '700' }}>
                      #{position}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <AvatarWithFrame rank={player.rank} size="small" />

                {/* Player Info */}
                <div className="flex-1">
                  <div
                    className="mb-1"
                    style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: rankColors[player.rank],
                    }}
                  >
                    {player.name}
                  </div>
                  <div className="text-[#CCCCCC]">
                    Ранг: {player.rank}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-[#CCCCCC]">очков</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
