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
        lighter: 'border-lighter',
        light: 'border-light',
        dark: 'border-dark',
        darker: 'border-darker',
        white: 'border-white'
      };
    }

    return {
      lighter: 'bg-lighter',
      light: 'bg-light',
      dark: 'bg-dark',
      darker: 'bg-darker',
      white: 'bg-white',
      gradient: 'bg-gradient-theme',
      'mono-dark': 'bg-mono-dark',
      'mono-darker': 'bg-mono-darker',
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
