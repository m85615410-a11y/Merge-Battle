import { User } from 'lucide-react';

type Rank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
type Size = 'small' | 'medium' | 'large';

interface AvatarWithFrameProps {
  rank: Rank;
  size?: Size;
  imageUrl?: string;
}

const frameStyles: Record<Rank, { border: string; shadow: string; animation?: string }> = {
  D: {
    border: '3px solid #9E9E9E',
    shadow: '0 0 15px rgba(158, 158, 158, 0.4)',
  },
  C: {
    border: '3px solid #2196F3',
    shadow: '0 0 20px rgba(33, 150, 243, 0.5)',
  },
  B: {
    border: '3px solid #4CAF50',
    shadow: '0 0 20px rgba(76, 175, 80, 0.5)',
  },
  A: {
    border: '3px solid #9C27B0',
    shadow: '0 0 25px rgba(156, 39, 176, 0.6)',
  },
  S: {
    border: '4px solid #FF9800',
    shadow: '0 0 30px rgba(255, 152, 0, 0.7)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  SS: {
    border: '4px solid #F44336',
    shadow: '0 0 35px rgba(244, 67, 54, 0.8)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  SSS: {
    border: '5px solid transparent',
    shadow: '0 0 40px rgba(255, 215, 0, 0.9)',
    animation: 'pulse 1s ease-in-out infinite',
  },
};

const sizeMap = {
  small: { container: 'w-12 h-12', icon: 'w-6 h-6' },
  medium: { container: 'w-24 h-24', icon: 'w-12 h-12' },
  large: { container: 'w-32 h-32', icon: 'w-16 h-16' },
};

export function AvatarWithFrame({ rank, size = 'medium', imageUrl }: AvatarWithFrameProps) {
  const frameStyle = frameStyles[rank];
  const sizeStyle = sizeMap[size];

  // Special SSS gradient border
  const borderStyle = rank === 'SSS'
    ? {
        background: 'linear-gradient(135deg, #FF00FF, #00FFFF, #FFFF00, #FF00FF)',
        backgroundSize: '400% 400%',
        animation: 'gradient 3s ease infinite',
      }
    : {};

  return (
    <div
      className={`${sizeStyle.container} rounded-full flex items-center justify-center relative`}
      style={{
        ...borderStyle,
        padding: rank === 'SSS' ? '3px' : '0',
        boxShadow: frameStyle.shadow,
      }}
    >
      <div
        className={`${sizeStyle.container} rounded-full overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center`}
        style={
          rank !== 'SSS'
            ? {
                border: frameStyle.border,
              }
            : {}
        }
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] w-full h-full flex items-center justify-center">
            <User className={`${sizeStyle.icon} text-[#00E5FF]`} />
          </div>
        )}
      </div>
    </div>
  );
}
