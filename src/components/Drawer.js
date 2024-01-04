import React from 'react';
import cn from 'classnames';

import { Surface, Text, Icon } from '../components';

const Drawer = ({ title, children, isOpen, onClose }) => {
  return (
    <Surface
      className={cn(
        'fixed top-0 left-0 w-full h-full transition-transform z-50 flex flex-col',
        {
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen
        }
      )}
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

      <Text className='text-xl mb-5 uppercase leading-8'>{title}</Text>

      {children}
    </Surface>
  );
};

const DrawerBody = ({ children }) => {
  return (
    <Surface
      color='mono-darker'
      padding='md'
      rounded='default'
      className='h-full'
    >
      {children}
    </Surface>
  );
};

Drawer.Body = DrawerBody;

export { Drawer };
