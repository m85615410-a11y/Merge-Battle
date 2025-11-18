import { Play, RotateCcw, Volume2, Home } from 'lucide-react';

interface GameMenuProps {
  onContinue: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function GameMenu({ onContinue, onRestart, onMainMenu }: GameMenuProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-sm w-full mx-4">
        <h3 className="text-white text-center mb-6" style={{ fontSize: '28px', fontWeight: '700' }}>
          Пауза
        </h3>

        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-xl bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all flex items-center justify-center gap-3"
            style={{ fontWeight: '600' }}
          >
            <Play className="w-5 h-5" />
            Продолжить
          </button>

          <button
            onClick={onRestart}
            className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-3"
            style={{ fontWeight: '600' }}
          >
            <RotateCcw className="w-5 h-5" />
            Начать заново
          </button>

          <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-3"
            style={{ fontWeight: '600' }}
          >
            <Volume2 className="w-5 h-5" />
            Настройки звука
          </button>

          <button
            onClick={onMainMenu}
            className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-3"
            style={{ fontWeight: '600' }}
          >
            <Home className="w-5 h-5" />
            В главное меню
          </button>
        </div>
      </div>
    </div>
  );
}
