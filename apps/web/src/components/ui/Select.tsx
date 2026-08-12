import React, { SelectHTMLAttributes, ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  onValueChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  onChange,
  onValueChange,
  className = '',
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium text-[var(--text)]">{label}</label>}
      <select
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};