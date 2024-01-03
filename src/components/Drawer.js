import React from 'react';
import cn from 'classnames';

import { Surface, Text, Icon } from '../components';

const Drawer = ({ title, children, isOpen, onClose }) => {
  return (
    <Surface
      className={cn('fixed top-0 left-0 w-full h-full transition-transform', {
        'translate-x-0': isOpen,
        'translate-x-full': !isOpen
      })}
      padding='md'
      color='mono-dark'
    >
      <Surface
        as='button'
        className='absolute top-4 right-4 h-8 w-8'
        type='button'
        rounded='sm'
        onClick={() => onClose()}
      >
        <Icon size='lg' name='close' color='mono-dark' />
      </Surface>

      <Text className='text-xl mb-5 uppercase border-b pb-2'>{title}</Text>

      {children}
    </Surface>
  );
};

const DrawerBody = ({ children }) => {
  return <div>{children}</div>;
};

Drawer.Body = DrawerBody;

export { Drawer };
