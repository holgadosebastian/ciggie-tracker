import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Surface, Text } from '../../components';
import MainContext from '../../context/MainContext';

export const Tabs = () => {
  const { currentTab, tabs } = useContext(MainContext);

  return (
    <div className='h-12 flex fixed bottom-0 left-0 w-full border-t-dark border-t-2'>
      {tabs.map(({ id, name, icon }) => (
        <Surface
          as={Link}
          key={id}
          to={`/habit/${id}`}
          className='uppercase h-12 px-4 leading-10 text-xs flex flex-col gap-1 items-center justify-center'
          color={currentTab.id === id ? 'gradient' : 'transparent'}
        >
          <Icon name={icon || 'fire'} size='xs' />
          <Text size='tiny'>{name}</Text>
        </Surface>
      ))}
    </div>
  );
};
