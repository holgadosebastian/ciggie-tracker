import React, { useContext, useMemo, useState, useEffect } from 'react';
import cn from 'classnames';

import { Surface, Text, Icon } from '../../components';
import {
  getDaysInMonth,
  getDailyOccurrences,
  formatDateNth,
  formatMonthAndYear,
  formatDateToNumeric
} from '../../lib/utils';
import MainContext from '../../context/MainContext';

export const Calendar = () => {
  const [monthAndYear, setMonthAndYear] = useState([
    new Date().getMonth(),
    new Date().getFullYear()
  ]);
  const [daysInMonth, setDaysInMonth] = useState([]);

  const handlePreviousMonth = () => {
    const [month, year] = monthAndYear;

    setMonthAndYear([
      month === 0 ? 11 : month - 1,
      month !== 0 ? year : year - 1
    ]);
  };

  const handleNextMonth = () => {
    const [month, year] = monthAndYear;

    setMonthAndYear([
      month === 11 ? 0 : month + 1,
      month !== 11 ? year : year + 1
    ]);
  };

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(...monthAndYear));
  }, [monthAndYear]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <Surface
          as='button'
          className='flex items-center justify-center w-5 h-5'
          rounded='sm'
          onClick={() => handlePreviousMonth()}
        >
          <Icon name='chevron-left' color='mono-dark' size='xs' />
        </Surface>
        <Text className='uppercase'>{formatMonthAndYear(...monthAndYear)}</Text>
        <Surface
          as='button'
          className='flex items-center justify-center w-5 h-5'
          rounded='sm'
          onClick={() => handleNextMonth()}
        >
          <Icon name='chevron-right' color='mono-dark' size='xs' />
        </Surface>
      </div>
      <div className='grid grid-cols-7 gap-1 overflow-y-auto'>
        {daysInMonth.map((day) => {
          return <CalendarDay key={day} day={day} />;
        })}
      </div>
    </div>
  );
};

const CalendarDay = ({ day }) => {
  const {
    currentTab: { occurrences }
  } = useContext(MainContext);
  const numericDay = formatDateToNumeric(day);
  const todayDate = formatDateToNumeric(new Date());
  const isToday = numericDay === todayDate;
  const isInFuture = new Date(day).getTime() > new Date().getTime();
  const occurrencesCount = useMemo(
    () => getDailyOccurrences(occurrences, day).length,
    [occurrences, day]
  );

  return (
    <Surface
      outline
      rounded='default'
      padding='xs'
      className={cn('flex flex-col gap-1 items-center', {
        'opacity-50': isInFuture
      })}
      color={isToday ? 'light' : 'white'}
    >
      <Text
        size='tiny'
        className='leading-none'
        color={isToday ? 'light' : 'white'}
      >
        {formatDateNth(day.getDate())}
      </Text>
      <Text
        size='h6'
        className='leading-none font-bold'
        color={isToday ? 'light' : 'white'}
      >
        {!isInFuture ? occurrencesCount : '-'}
      </Text>
    </Surface>
  );
};
