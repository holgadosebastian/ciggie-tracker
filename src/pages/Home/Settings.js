import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';

import { FormField, Button, Icon, Text, Surface } from '../../components';
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
        'bg-slate-800',
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
        <div className='border-b pb-2 border-b-dark relative'>
          <input
            type='text'
            value={updatedSettings.name}
            className='bg-transparent text-4xl w-full'
            name='name'
            value={updatedSettings.name}
            onChange={handleSettingsUpdate}
          />
          <label className='absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none'>
            <Icon name='cog' color='white' />
          </label>
        </div>
        <div class='grid grid-cols-2 gap-5'>
          <Surface
            as='label'
            outline
            padding='md'
            rounded='md'
            htmlFor='SettingsGoal'
          >
            <Text size='tiny' className='text-center uppercase'>
              Max
            </Text>
            <input
              id='SettingsGoal'
              class='text-white text-5xl bg-transparent max-w-full text-center font-bold'
              name='goal'
              value={updatedSettings.goal}
              onChange={handleSettingsUpdate}
            />
            <Text size='tiny' className='text-center uppercase'>
              Per day
            </Text>
          </Surface>
          <Surface
            as='label'
            outline
            padding='md'
            rounded='md'
            htmlFor='SettingsDelay'
          >
            <Text size='tiny' className='text-center uppercase'>
              Every
            </Text>
            <input
              id='SettingsDelay'
              class='text-white text-5xl bg-transparent max-w-full text-center font-bold'
              name='delay'
              type='number'
              value={delayMinutes}
              onChange={handleDelayMinutesUpdate}
            />
            <Text size='tiny' className='text-center uppercase'>
              minutes
            </Text>
          </Surface>
        </div>
        <Button type='submit'>Update</Button>
      </form>
    </div>
  );
};
