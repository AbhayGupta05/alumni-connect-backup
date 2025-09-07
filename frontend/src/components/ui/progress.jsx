import React from 'react';
import { cn } from '@/lib/utils';

const Progress = ({ value, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary-100',
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary-500 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};

export { Progress };


