import cn from 'classnames';

export const Surface = ({
  children,
  as = 'div',
  color = 'white',
  rounded = 'none',
  padding = 'none',
  outline = false,
  className,
  ...props
}) => {
  const Elem = as;

  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    default: 'rounded',
    md: 'rounded-md'
  };

  const colorStyles = (() => {
    if (outline) {
      return {
        lighter: 'border-color-lighter',
        light: 'border-color-light',
        dark: 'border-color-dark',
        darker: 'border-color-darker',
        white: 'border-color-white'
      };
    }

    return {
      lighter: 'bg-lighter',
      light: 'bg-light',
      dark: 'bg-dark',
      darker: 'bg-darker',
      white: 'bg-white',
      gradient: 'bg-gradient-theme',
      'mono-dark': 'bg-slate-800',
      transparent: ''
    };
  })();

  const paddingStyles = {
    none: '',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-8'
  };

  const styles = cn(
    'transition-colors',
    colorStyles[color],
    roundedStyles[rounded],
    paddingStyles[padding],
    {
      border: outline
    },
    className
  );

  return (
    <Elem className={styles} {...props}>
      {children}
    </Elem>
  );
};
