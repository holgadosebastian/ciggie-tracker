import cn from 'classnames';

export const Icon = ({ name }) => (
  <span className={cn('fa', { [`fa-${name}`]: name })} />
);
