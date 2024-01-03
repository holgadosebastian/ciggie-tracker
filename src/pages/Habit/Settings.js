import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';

import { Button, Icon, Text, Surface } from '../../components';
import MainContext from '../../context/MainContext';

export const Settings = ({ isOpen, onClose }) => {
  const [page, setPage] = useState('initial');
  const { currentTab } = useContext(MainContext);

  useEffect(() => {
    setPage('initial');
  }, [currentTab]);

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
        'z-50',
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
      {page === 'initial' ? (
        <InitialPage onSetRemovePage={() => setPage('remove')} />
      ) : page === 'remove' ? (
        <RemovePage onCancel={() => setPage('initial')} />
      ) : (
        <ConfigPage />
      )}
    </div>
  );
};

const InitialPage = ({ onSetRemovePage }) => {
  const [updatedSettings, setUpdatedSettings] = useState({
    name: '',
    icon: 'fire',
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
    <div className='flex flex-col justify-between h-full'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <Surface
            rounded='default'
            color='gradient'
            className='aspect-square flex items-center justify-center w-12 shrink-0'
          >
            <Icon name={currentTab.icon || 'fire'} size='xl' />
          </Surface>
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
        </div>

        <div className='grid grid-cols-2 gap-5'>
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
              className='text-white text-5xl bg-transparent max-w-full text-center font-bold'
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
              className='text-white text-5xl bg-transparent max-w-full text-center font-bold'
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
      <Button
        variant='outline'
        className='text-red-500'
        onClick={() => onSetRemovePage()}
      >
        Remove
      </Button>
    </div>
  );
};

const RemovePage = ({ onCancel }) => {
  const { currentTab, removeTab } = useContext(MainContext);

  return (
    <>
      <div className='text-center flex flex-col gap-3 items-center'>
        <Surface
          className='w-12 h-12 flex items-center justify-center'
          rounded='default'
          color='gradient'
        >
          <Icon size='xl' name={currentTab.icon || 'fire'} />
        </Surface>
        <Text size='h5' className='uppercase'>
          {currentTab.name}
        </Text>
        <Text className='text'>
          Are you sure you want to remove this habit?
        </Text>
        <Button className='w-full' onClick={() => removeTab(currentTab.id)}>
          Remove
        </Button>
        <Button className='w-full' variant='outline' onClick={() => onCancel()}>
          Cancel
        </Button>
      </div>
    </>
  );
};

const ConfigPage = () => {
  return 'Config';
};
