import { useState, useEffect } from 'react';
import { ArrowLeft, Settings, RotateCcw } from 'lucide-react';
import { GameTile } from './GameTile';
import { GameMenu } from './GameMenu';

interface GameScreenProps {
  gridSize: number;
  onBack: () => void;
}

// Game logic
function initializeGrid(size: number): (number | null)[][] {
  const grid: (number | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  // Add two random tiles
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
}

function addRandomTile(grid: (number | null)[][]) {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) emptyCells.push([i, j]);
    });
  });
  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
}

export function GameScreen({ gridSize, onBack }: GameScreenProps) {
  const [grid, setGrid] = useState<(number | null)[][]>(() => initializeGrid(gridSize));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        // Game logic would go here
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid]);

  const resetGame = () => {
    setGrid(initializeGrid(gridSize));
    setScore(0);
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowMenu(true)}
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col items-center">
          <div className="text-[#CCCCCC]">Рекорд</div>
          <div className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
            {bestScore}
          </div>
        </div>

        <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Score Display */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="text-[#CCCCCC] text-center">Счёт</div>
          <div className="text-white text-center" style={{ fontSize: '28px', fontWeight: '700' }}>
            {score}
          </div>
        </div>
        <button
          onClick={resetGame}
          className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5 text-[#00E5FF]" />
          <span className="text-white">Заново</span>
        </button>
      </div>

      {/* Game Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-3 border border-white/20"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: '12px',
            maxWidth: '400px',
            aspectRatio: '1',
          }}
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <GameTile key={`${i}-${j}`} value={cell} />
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-[#CCCCCC] mt-4">
        Используйте стрелки или свайпы для перемещения плиток
      </div>

      {showMenu && (
        <GameMenu
          onContinue={() => setShowMenu(false)}
          onRestart={resetGame}
          onMainMenu={onBack}
        />
      )}
    </div>
  );
}
