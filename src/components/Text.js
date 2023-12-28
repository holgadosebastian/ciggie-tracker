import React from 'react';
import cn from 'classnames';

export const Text = ({
  size = 'base',
  as = 'p',
  className,
  children,
  ...props
}) => {
  const Elem = as;
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base'
  };
  const style = cn(sizes[size], className);

  return (
    <Elem className={style} {...props}>
      {children}
    </Elem>
  );
};
