import cn from 'classnames';

import { Surface } from './Surface';

export const Button = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const styles = cn(className, 'h-10', 'px-6', 'uppercase', {
    'text-violet-700': variant === 'primary'
  });

  const background = {
    primary: 'white'
  };

  return (
    <Surface
      className={styles}
      as='button'
      rounded='default'
      background={background[variant]}
      {...props}
    >
      {children}
    </Surface>
  );
};
