import { useState } from 'react';
import { ArrowLeft, Camera, Edit2 } from 'lucide-react';
import { AvatarWithFrame } from './ui/AvatarWithFrame';
import { EditProfileModal } from './EditProfileModal';

interface ProfileScreenProps {
  onBack: () => void;
  onViewFrames: () => void;
}

type Rank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

const rankColors: Record<Rank, string> = {
  D: '#9E9E9E',
  C: '#2196F3',
  B: '#4CAF50',
  A: '#9C27B0',
  S: '#FF9800',
  SS: '#F44336',
  SSS: '#FFD700',
};

export function ProfileScreen({ onBack, onViewFrames }: ProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRank] = useState<Rank>('B');
  const [username] = useState('YouPlayer');

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
          Профиль
        </h2>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <AvatarWithFrame rank={currentRank} size="large" />
          <button className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-[#00E5FF] hover:bg-[#4361EE] flex items-center justify-center shadow-lg transition-all">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Username with rank color */}
        <h3
          className="mb-2"
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: rankColors[currentRank],
          }}
        >
          {username}
        </h3>

        {/* Rank Badge */}
        <div
          className="px-6 py-2 rounded-full"
          style={{
            backgroundColor: rankColors[currentRank],
            boxShadow: `0 0 20px ${rankColors[currentRank]}60`,
          }}
        >
          <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
            Ранг {currentRank}
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6">
        <h4 className="text-white mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
          Статистика
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#CCCCCC]">Победы в PVP</span>
            <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
              127
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-[#CCCCCC]">Лучший счёт (4x4)</span>
            <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
              65,536
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-[#CCCCCC]">Текущая серия побед</span>
            <span className="text-[#00E5FF]" style={{ fontSize: '20px', fontWeight: '700' }}>
              5
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between items-center">
            <span className="text-[#CCCCCC]">Макс. ранг</span>
            <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
              A+
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={() => setShowEditModal(true)}
        className="w-full py-4 rounded-xl bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all flex items-center justify-center gap-3"
        style={{ fontWeight: '600' }}
      >
        <Edit2 className="w-5 h-5" />
        Редактировать профиль
      </button>

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          onViewFrames={onViewFrames}
          currentRank={currentRank}
          currentUsername={username}
        />
      )}
    </div>
  );
}
