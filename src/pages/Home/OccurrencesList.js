import React, { useState, useContext } from 'react';
import cn from 'classnames';

import { Icon, Surface, Text } from '../../components';
import { getTimeString } from '../../lib/utils';
import MainContext from '../../context/MainContext';
import { useOccurrences } from '../../hooks/useOccurrences';

export const OccurrencesList = () => {
  const [activeOccurrenceId, setActiveOccurrenceId] = useState(null);
  const { todayOccurrences } = useOccurrences();

  return (
    <div className='overflow-y-auto mb-4'>
      <ul className='flex flex-col gap-2'>
        {todayOccurrences.map(({ id, date }) => (
          <OccurrenceItem
            id={id}
            key={id}
            date={date}
            active={activeOccurrenceId === id}
            onSetActiveOccurrenceId={setActiveOccurrenceId}
          />
        ))}
      </ul>
    </div>
  );
};

const OccurrenceItem = ({ id, date, active, onSetActiveOccurrenceId }) => {
  const { removeOccurrence } = useContext(MainContext);

  const handleRemoveOccurrence = (event) => {
    event.stopPropagation();
    removeOccurrence(id);
  };

  return (
    <Surface
      as='li'
      rounded='sm'
      onClick={() =>
        active ? onSetActiveOccurrenceId(null) : onSetActiveOccurrenceId(id)
      }
      key={id}
      className={cn(
        'pl-4',
        'pr-2',
        'h-8',
        'transition-colors',
        'flex',
        'justify-between',
        'items-center',
        {
          'text-dark': active
        }
      )}
      background={active ? 'white' : 'dark'}
    >
      <Text color={active ? 'dark' : 'white'}>{getTimeString(date)}</Text>
      {active && (
        <div className='flex'>
          <button
            className='h-8 w-8 text-center leading-8'
            onClick={handleRemoveOccurrence}
          >
            <Icon name='trash-alt' color='dark' />
          </button>
          <div
            className='h-8 w-8 text-center leading-8'
            onClick={() => onSetActiveOccurrenceId(null)}
          >
            <Icon name='close' color='dark' />
          </div>
        </div>
      )}
    </Surface>
  );
};
