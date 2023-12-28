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

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={cn(
        className,
        'bg-transparent border-white border rounded px-4 h-10'
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export const FormField = ({ type = 'text', label, children, ...props }) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      {type === 'select' ? (
        <Select {...props}>{children}</Select>
      ) : (
        <Input {...props} />
      )}
    </div>
  );
};
