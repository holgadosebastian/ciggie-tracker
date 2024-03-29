import React from 'react';
import cn from 'classnames';

export const Container = ({ children, className, ...props }) => {
  return (
    <div className={cn('mx-auto px-4 max-w-sm', className)} {...props}>
      {children}
    </div>
  );
};
