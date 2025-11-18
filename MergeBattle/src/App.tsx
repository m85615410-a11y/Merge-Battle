import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { MainMenu } from './components/MainMenu';
import { ModeSelection } from './components/ModeSelection';
import { GameScreen } from './components/GameScreen';
import { PVPLobby } from './components/PVPLobby';
import { Leaderboard } from './components/Leaderboard';
import { ProfileScreen } from './components/ProfileScreen';
import { FramesCollection } from './components/FramesCollection';

type Screen = 'splash' | 'menu' | 'mode-select' | 'game' | 'pvp' | 'leaderboard' | 'profile' | 'frames';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedGridSize, setSelectedGridSize] = useState<number>(4);

  // Auto-navigate from splash to menu after 2 seconds
  useState(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('menu'), 2000);
    }
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'menu':
        return <MainMenu onNavigate={setCurrentScreen} />;
      case 'mode-select':
        return (
          <ModeSelection
            onBack={() => setCurrentScreen('menu')}
            onSelect={(size) => {
              setSelectedGridSize(size);
              setCurrentScreen('game');
            }}
          />
        );
      case 'game':
        return (
          <GameScreen
            gridSize={selectedGridSize}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      case 'pvp':
        return <PVPLobby onBack={() => setCurrentScreen('menu')} />;
      case 'leaderboard':
        return <Leaderboard onBack={() => setCurrentScreen('menu')} />;
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('menu')}
            onViewFrames={() => setCurrentScreen('frames')}
          />
        );
      case 'frames':
        return <FramesCollection onBack={() => setCurrentScreen('profile')} />;
      default:
        return <MainMenu onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#16213E] overflow-hidden">
      {renderScreen()}
    </div>
  );
}
