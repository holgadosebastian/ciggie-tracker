import cn from 'classnames';

export const Button = ({
  as = 'button',
  href,
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const Elem = href ? 'a' : as;

  const backgroundStyles = {
    primary: 'bg-white',
    secondary: 'bg-light',
    outline: 'bg-transparent'
  };

  const styles = cn(
    className,
    'h-10',
    'px-6',
    'uppercase',
    'rounded',
    backgroundStyles[variant],
    {
      'text-dark': variant === 'primary',
      'text-white': variant !== 'primary',
      border: variant === 'outline'
    }
  );

  return (
    <Elem className={styles} {...props}>
      {children}
    </Elem>
  );
};
