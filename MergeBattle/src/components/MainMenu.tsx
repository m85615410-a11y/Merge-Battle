import { User, Settings, Trophy } from 'lucide-react';
import { GlassButton } from './ui/GlassButton';
import { useState } from 'react';
import { HowToPlayModal } from './HowToPlayModal';

type Screen = 'menu' | 'mode-select' | 'pvp' | 'leaderboard' | 'profile';

interface MainMenuProps {
  onNavigate: (screen: Screen) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => onNavigate('profile')}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <User className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Logo/Title */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-white mb-2" style={{ fontSize: '56px', fontWeight: '700', letterSpacing: '-2px' }}>
            Merge Battle
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-[#00E5FF]" />
            <p className="text-[#CCCCCC]">Головоломка нового поколения</p>
          </div>
        </div>

        {/* Main Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <GlassButton
            variant="primary"
            size="large"
            onClick={() => onNavigate('mode-select')}
          >
            Play
          </GlassButton>

          <GlassButton
            variant="outline"
            size="medium"
            onClick={() => onNavigate('pvp')}
          >
            PVP
          </GlassButton>

          <GlassButton
            variant="outline"
            size="medium"
            onClick={() => onNavigate('leaderboard')}
          >
            Leaderboard
          </GlassButton>
        </div>

        {/* How to Play Link */}
        <button
          onClick={() => setShowHowToPlay(true)}
          className="text-[#00E5FF] hover:text-[#4361EE] transition-colors underline"
        >
          Как играть?
        </button>
      </div>

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
    </div>
  );
}
