import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Surface, Text } from '../../components';
import MainContext from '../../context/MainContext';

export const Tabs = () => {
  const { currentTab, tabs } = useContext(MainContext);

  return (
    <div className='h-12 grid grid-cols-4 fixed bottom-0 left-0 w-full bg-mono-darker'>
      {tabs.map(({ id, name, icon, themeColor }) => (
        <Surface
          as={Link}
          key={id}
          to={`/habit/${id}`}
          className='uppercase h-12 px-4 leading-10 text-xs flex flex-col gap-1 items-center justify-center'
          color={currentTab.id === id ? 'gradient' : 'transparent'}
          theme={themeColor}
        >
          <Icon
            name={icon || 'fire'}
            size='xs'
            color={currentTab.id === id ? 'white' : 'dark'}
          />
          <Text
            size='tiny'
            className='max-w-full text-ellipsis overflow-hidden'
          >
            {name}
          </Text>
        </Surface>
      ))}
    </div>
  );
};
