import React from 'react';
import cn from 'classnames';

export const Label = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        className,
        'bg-transparent border-white border rounded px-4 h-10'
      )}
      {...props}
    />
  );
};

export const FormField = ({ label, ...props }) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
};
