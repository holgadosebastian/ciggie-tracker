import React, { useContext, useMemo } from 'react';

import { Surface, Text } from '../../components';
import {
  getDaysInMonth,
  getDailyOccurrences,
  formatDateNth
} from '../../lib/utils';
import MainContext from '../../context/MainContext';

export const Calendar = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className='grid grid-cols-7 gap-1 overflow-y-auto'>
      {daysInMonth.map((day) => {
        return <CalendarDay key={day} day={day} />;
      })}
    </div>
  );
};

const CalendarDay = ({ day }) => {
  const {
    currentTab: { occurrences }
  } = useContext(MainContext);
  const isToday = day.getDate() === new Date().getDate();
  const occurrencesCount = useMemo(
    () => getDailyOccurrences(occurrences, day).length,
    [occurrences]
  );

  return (
    <Surface
      outline={!isToday}
      rounded='default'
      padding='xs'
      className='flex flex-col gap-1 items-center'
    >
      <Text
        size='tiny'
        className='leading-none'
        color={isToday ? 'mono-dark' : 'white'}
      >
        {formatDateNth(day.getDate())}
      </Text>
      <Text
        size='h6'
        className='leading-none font-bold'
        color={isToday ? 'mono-dark' : 'white'}
      >
        {occurrencesCount}
      </Text>
    </Surface>
  );
};
