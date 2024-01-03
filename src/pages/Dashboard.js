import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import MainContext from '../context/MainContext';
import { Container, Surface, Text, Icon } from '../components';
import { getStoredTabInfo } from '../lib/utils';

const Dashboard = () => {
  const { tabs } = useContext(MainContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(() => {
      return tabs.map((tab) => {
        return getStoredTabInfo(tab.id);
      });
    });
  }, []);

  console.log('items', items);

  return (
    <div className='h-[calc(100vh-6.5rem)]'>
      <Container className='h-full flex flex-col gap-4'>
        {items.map(({ id, name, themeColor, icon, occurrences }) => (
          <TabItem
            key={id}
            id={id}
            name={name}
            themeColor={themeColor}
            icon={icon}
            occurrences={occurrences}
          />
        ))}
      </Container>
    </div>
  );
};

const TabItem = ({ id, name, themeColor, icon, occurrences }) => {
  const navigate = useNavigate();
  const { setCurrentTab } = useContext(MainContext);

  const handleOpenTab = () => {
    setCurrentTab(id);
    navigate('/tab');
  };

  return (
    <Surface
      theme={themeColor}
      color='gradient'
      padding='md'
      rounded='default'
      onClick={handleOpenTab}
    >
      <div className='flex gap-5 items-center'>
        <Surface
          className='flex items-center justify-center shrink-0 w-10 h-10'
          rounded='default'
        >
          <Icon name={icon || 'fire'} color='dark' />
        </Surface>
        <div>
          <Text size='h5' className='uppercase'>
            {name}
          </Text>
          <Text size='small'>Today: {occurrences.length}</Text>
        </div>
      </div>
    </Surface>
  );
};

export default Dashboard;
