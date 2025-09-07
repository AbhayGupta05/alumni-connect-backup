import React from 'react';
import { cn } from '@/lib/utils';

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variantStyles = {
    default: 'border-transparent bg-primary-500 text-primary-50 hover:bg-primary-500/80',
    secondary: 'border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-100/80',
    destructive: 'border-transparent bg-red-500 text-red-50 hover:bg-red-500/80',
    outline: 'text-foreground',
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};

export { Badge };


