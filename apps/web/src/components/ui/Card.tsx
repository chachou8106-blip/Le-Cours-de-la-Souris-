import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  ...props
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold text-[var(--primary)]">{title}</h3>}
          {subtitle && <p className="text-sm text-[var(--secondary)]">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};