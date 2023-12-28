import cn from 'classnames';

export const Icon = ({ className, name }) => (
  <span className={cn(className, 'fa', { [`fa-${name}`]: name })} />
);
