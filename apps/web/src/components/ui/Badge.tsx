import React, { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[var(--primary)] text-[var(--light)]',
    secondary: 'bg-[var(--secondary)] text-[var(--light)]',
    accent: 'bg-[var(--accent)] text-[var(--primary)]',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};