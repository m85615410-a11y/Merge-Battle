import { ArrowLeft, Lock, Check } from 'lucide-react';
import { AvatarWithFrame } from './ui/AvatarWithFrame';

interface FramesCollectionProps {
  onBack: () => void;
}

type Rank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

interface Frame {
  id: string;
  name: string;
  rank: Rank;
  requirement: string;
  unlocked: boolean;
  selected?: boolean;
}

const frames: Frame[] = [
  { id: '1', name: 'Рамка Новичка', rank: 'D', requirement: 'Начальная рамка', unlocked: true },
  { id: '2', name: 'Рамка Искателя', rank: 'C', requirement: 'Достигнуть ранга C', unlocked: true },
  { id: '3', name: 'Рамка Воина', rank: 'B', requirement: 'Достигнуть ранга B', unlocked: true, selected: true },
  { id: '4', name: 'Рамка Мастера', rank: 'A', requirement: 'Достигнуть ранга A', unlocked: false },
  { id: '5', name: 'Рамка Легенды', rank: 'S', requirement: 'Достигнуть ранга S', unlocked: false },
  { id: '6', name: 'Рамка Чемпиона', rank: 'SS', requirement: 'Выиграть 50 матчей', unlocked: false },
  { id: '7', name: 'Рамка Божества', rank: 'SSS', requirement: 'Достигнуть ранга SSS', unlocked: false },
];

export function FramesCollection({ onBack }: FramesCollectionProps) {
  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
          Коллекция Рамок
        </h2>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Frames Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {frames.map((frame) => (
            <div
              key={frame.id}
              className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border transition-all ${
                frame.selected
                  ? 'border-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
                  : 'border-white/20'
              } ${!frame.unlocked ? 'opacity-60' : 'hover:bg-white/15'}`}
            >
              <div className="flex flex-col items-center">
                {/* Avatar Preview */}
                <div className="relative mb-3">
                  <AvatarWithFrame rank={frame.rank} size="medium" />
                  {!frame.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {frame.selected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00E5FF] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Frame Info */}
                <h4 className="text-white text-center mb-1" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {frame.name}
                </h4>
                <p className="text-[#CCCCCC] text-center mb-3" style={{ fontSize: '12px' }}>
                  {frame.requirement}
                </p>

                {/* Action Button */}
                {frame.unlocked && !frame.selected && (
                  <button className="w-full py-2 rounded-lg bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all">
                    Выбрать
                  </button>
                )}
                {frame.selected && (
                  <div className="w-full py-2 rounded-lg bg-white/10 border border-[#00E5FF] text-[#00E5FF] text-center">
                    Выбрано
                  </div>
                )}
                {!frame.unlocked && (
                  <div className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-[#CCCCCC] text-center">
                    Заблокировано
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
