import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}: GlassButtonProps) {
  const baseStyles = 'rounded-xl transition-all backdrop-blur-md border';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#00E5FF] to-[#4361EE] hover:from-[#4361EE] hover:to-[#00E5FF] text-white border-transparent shadow-lg shadow-[#00E5FF]/30',
    outline: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    secondary: 'bg-white/5 hover:bg-white/10 text-[#CCCCCC] hover:text-white border-white/10',
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-5 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} w-full`}
      style={{ fontWeight: '600' }}
    >
      {children}
    </button>
  );
}
