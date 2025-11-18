import { X, Move, Target, Trophy } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white" style={{ fontSize: '28px', fontWeight: '700' }}>
            Как играть?
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
              <Move className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h4 className="text-white mb-2" style={{ fontWeight: '600' }}>
                Управление
              </h4>
              <p className="text-[#CCCCCC]">
                Используйте стрелки на клавиатуре или свайпы на мобильном устройстве для перемещения плиток.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h4 className="text-white mb-2" style={{ fontWeight: '600' }}>
                Цель игры
              </h4>
              <p className="text-[#CCCCCC]">
                Соединяйте плитки с одинаковыми числами, чтобы создавать новые плитки с большими значениями. Стремитесь к максимальному счёту!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h4 className="text-white mb-2" style={{ fontWeight: '600' }}>
                PVP Режим
              </h4>
              <p className="text-[#CCCCCC]">
                Сражайтесь с другими игроками в реальном времени. Побеждайте, чтобы повысить свой ранг от D до SSS!
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all"
          style={{ fontWeight: '600' }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
