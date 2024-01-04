import React from 'react';
import cn from 'classnames';

export const Text = ({
  size = 'base',
  as = 'p',
  color = 'white',
  className,
  children,
  ...props
}) => {
  const Elem = as;

  const colorStyles = {
    white: 'text-white',
    lighter: 'text-lighter',
    light: 'text-light',
    darker: 'text-darker',
    dark: 'text-dark',
    'mono-dark': 'text-mono-dark'
  };

  const sizes = {
    tiny: 'text-xs',
    small: 'text-sm',
    base: 'text-base',
    h6: 'text-lg',
    h5: 'text-xl',
    h4: 'text-2xl',
    h3: 'text-3xl',
    h2: 'text-4xl',
    h1: 'text-5xl'
  };

  const style = cn(colorStyles[color], sizes[size], className);

  return (
    <Elem className={style} {...props}>
      {children}
    </Elem>
  );
};
