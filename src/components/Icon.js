import cn from 'classnames';

export const Icon = ({ color = 'white', size = 'base', className, name }) => {
  const colorStyles = {
    white: 'text-white',
    light: 'text-light',
    dark: 'text-dark'
  };

  const sizeStyles = {
    base: 'text-base',
    xs: 'text-xs',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <span
      className={cn(colorStyles[color], sizeStyles[size], className, 'fa', {
        [`fa-${name}`]: name
      })}
    />
  );
};
