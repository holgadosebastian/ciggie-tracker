import cn from 'classnames';

export const Surface = ({
  children,
  as = 'div',
  background = 'darker',
  rounded = 'none',
  padding = 'none',
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
  const backgroundStyles = {
    lighter: 'bg-lighter',
    light: 'bg-light',
    dark: 'bg-dark',
    darker: 'bg-darker',
    white: 'bg-white',
    transparent: ''
  };
  const paddingStyles = {
    none: '',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-8'
  };
  const styles = cn(
    'transition-colors',
    backgroundStyles[background],
    roundedStyles[rounded],
    paddingStyles[padding],
    className
  );

  return (
    <Elem className={styles} {...props}>
      {children}
    </Elem>
  );
};
