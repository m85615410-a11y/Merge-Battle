import { ArrowLeft } from 'lucide-react';

interface ModeSelectionProps {
  onBack: () => void;
  onSelect: (size: number) => void;
}

const gridSizes = [4, 5, 6, 7, 8, 9, 10];

export function ModeSelection({ onBack, onSelect }: ModeSelectionProps) {
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

      {/* Title */}
      <h2 className="text-white mb-8" style={{ fontSize: '32px', fontWeight: '600' }}>
        Классический Режим
      </h2>

      {/* Grid Selection */}
      <div className="grid grid-cols-3 gap-4">
        {gridSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className="aspect-square rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all flex flex-col items-center justify-center group"
          >
            <div className="text-white group-hover:text-[#00E5FF] transition-colors" style={{ fontSize: '36px', fontWeight: '700' }}>
              {size}×{size}
            </div>
            <div className="text-[#CCCCCC] group-hover:text-white transition-colors mt-1">
              Сетка
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
