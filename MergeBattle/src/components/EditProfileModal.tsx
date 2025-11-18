import { X, Upload, Trash2, Eye } from 'lucide-react';
import { AvatarWithFrame } from './ui/AvatarWithFrame';

interface EditProfileModalProps {
  onClose: () => void;
  onViewFrames: () => void;
  currentRank: 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
  currentUsername: string;
}

export function EditProfileModal({
  onClose,
  onViewFrames,
  currentRank,
  currentUsername,
}: EditProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
            Редактирование профиля
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Avatar Section */}
        <div className="mb-6">
          <label className="text-white mb-3 block" style={{ fontSize: '16px', fontWeight: '600' }}>
            Аватар
          </label>
          <div className="flex flex-col items-center bg-white/5 rounded-2xl p-6 border border-white/10">
            <AvatarWithFrame rank={currentRank} size="medium" />
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Загрузить фото
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Удалить
              </button>
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="mb-6">
          <label className="text-white mb-2 block" style={{ fontSize: '16px', fontWeight: '600' }}>
            Имя игрока
          </label>
          <input
            type="text"
            defaultValue={currentUsername}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#CCCCCC] focus:outline-none focus:border-[#00E5FF] transition-all"
            placeholder="Введите имя"
          />
          <p className="text-[#CCCCCC] mt-2">
            Цвет ника будет меняться в зависимости от вашего ранга.
          </p>
        </div>

        {/* Frame Section */}
        <div className="mb-6">
          <label className="text-white mb-3 block" style={{ fontSize: '16px', fontWeight: '600' }}>
            Рамка профиля
          </label>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-shrink-0">
                <AvatarWithFrame rank={currentRank} size="small" />
              </div>
              <div>
                <div className="text-white" style={{ fontWeight: '600' }}>
                  Рамка Воина (Ранг {currentRank})
                </div>
                <div className="text-[#CCCCCC]">Текущая рамка</div>
              </div>
            </div>
            <button
              onClick={onViewFrames}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Просмотреть все рамки
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            style={{ fontWeight: '600' }}
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#4361EE] text-white transition-all"
            style={{ fontWeight: '600' }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
