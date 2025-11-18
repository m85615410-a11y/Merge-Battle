interface GameTileProps {
  value: number | null;
}

// Color and style mapping for each tile value
const tileStyles: Record<number, { bg: string; text: string; glow?: boolean; shadow?: boolean }> = {
  2: { bg: '#A7E6FF', text: '#1A1A2E' },
  4: { bg: '#7DD3FC', text: '#1A1A2E' },
  8: { bg: '#4FC3F7', text: '#FFFFFF' },
  16: { bg: '#29B6F6', text: '#FFFFFF' },
  32: { bg: '#03A9F4', text: '#FFFFFF' },
  64: { bg: '#039BE5', text: '#FFFFFF' },
  128: { bg: '#00E5FF', text: '#FFFFFF', shadow: true },
  256: { bg: '#00BCD4', text: '#FFFFFF', shadow: true },
  512: { bg: '#00ACC1', text: '#FFFFFF', shadow: true },
  1024: { bg: '#FFEB3B', text: '#1A1A2E', shadow: true },
  2048: { bg: '#FFC107', text: '#1A1A2E', shadow: true },
  4096: { bg: '#FFB300', text: '#1A1A2E', shadow: true },
  8192: { bg: '#FFA000', text: '#FFFFFF', shadow: true },
  16384: { bg: '#FF9800', text: '#FFFFFF', glow: true },
  32768: { bg: '#FF8A65', text: '#FFFFFF', glow: true },
  65536: { bg: '#FF7043', text: '#FFFFFF', glow: true },
  131072: { bg: '#FF5252', text: '#FFFFFF', glow: true },
  262144: { bg: '#F44336', text: '#FFFFFF', glow: true },
  524288: { bg: '#E91E63', text: '#FFFFFF', glow: true },
  1048576: { bg: '#E040FB', text: '#FFFFFF', glow: true },
  2097152: { bg: '#D500F9', text: '#FFFFFF', glow: true },
  4194304: { bg: '#AA00FF', text: '#FFFFFF', glow: true },
  8388608: { bg: '#7C4DFF', text: '#FFFFFF', glow: true },
  16777216: { bg: '#651FFF', text: '#FFFFFF', glow: true },
  33554432: { bg: '#311B92', text: '#00E5FF', glow: true },
};

function formatNumber(num: number): string {
  if (num >= 1048576) return `${(num / 1048576).toFixed(0)}M`;
  if (num >= 16384) return `${(num / 1024).toFixed(0)}K`;
  return num.toString();
}

export function GameTile({ value }: GameTileProps) {
  if (value === null) {
    return (
      <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 aspect-square" />
    );
  }

  const style = tileStyles[value] || tileStyles[2];
  const displayValue = formatNumber(value);
  
  // Adjust font size based on number length
  const getFontSize = () => {
    if (displayValue.length >= 5) return '18px';
    if (displayValue.length >= 4) return '22px';
    if (displayValue.length >= 3) return '26px';
    return '32px';
  };

  return (
    <div
      className="rounded-xl aspect-square flex items-center justify-center transition-all duration-200 transform hover:scale-105"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        boxShadow: style.shadow
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : style.glow
          ? `0 0 20px ${style.bg}80, 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 0 10px ${style.text}30`
          : 'none',
        border: value === 33554432 ? '2px solid #00E5FF' : 'none',
      }}
    >
      <span style={{ fontSize: getFontSize(), fontWeight: '700' }}>
        {displayValue}
      </span>
    </div>
  );
}
