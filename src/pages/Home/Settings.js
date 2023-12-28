import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';

import { FormField, Button, Icon } from '../../components';
import MainContext from '../../context/MainContext';

export const Settings = ({ isOpen, onClose }) => {
  const [updatedSettings, setUpdatedSettings] = useState({
    name: '',
    delay: 0,
    goal: 0
  });
  const [delayMinutes, setDelayMinutes] = useState('0');
  const { currentTab, updateTab } = useContext(MainContext);

  useEffect(() => {
    setUpdatedSettings({
      name: currentTab.name,
      delay: currentTab.delay,
      goal: currentTab.goal
    });
    setDelayMinutes(currentTab.delay / 60000);
  }, [currentTab]);

  const handleSettingsUpdate = (event) => {
    setUpdatedSettings((oldSettings) => ({
      ...oldSettings,
      [event.target.name]: event.target.value
    }));
  };

  const handleDelayMinutesUpdate = (event) => {
    setUpdatedSettings((oldSettings) => ({
      ...oldSettings,
      delay: parseInt(event.target.value) * 60 * 1000
    }));

    setDelayMinutes(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTab(updatedSettings);
  };

  return (
    <div
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'bg-dark',
        'w-full',
        'h-full',
        'transition-all',
        'p-10',
        {
          'opacity-0 pointer-events-none': !isOpen,
          'opacity-1': isOpen
        }
      )}
    >
      <button
        className='absolute top-2 right-2 w-10 h-10'
        onClick={() => onClose()}
      >
        <Icon name='close' />
      </button>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          label='Name'
          name='name'
          value={updatedSettings.name}
          onChange={handleSettingsUpdate}
        />
        <FormField
          label='Goal'
          name='goal'
          value={updatedSettings.goal}
          onChange={handleSettingsUpdate}
        />
        <FormField
          label='Delay'
          name='delay'
          type='number'
          value={delayMinutes}
          onChange={handleDelayMinutesUpdate}
        />
        <Button type='submit'>Update</Button>
      </form>
    </div>
  );
};