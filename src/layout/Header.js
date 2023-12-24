import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Icon, Surface } from '../components';
import MainContext from '../context/MainContext';

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Surface
        as='header'
        className='fixed inset-x-0 top-0 py-2 px-4 h-10 flex gap-x-3 justify-between bg-violet-700'
      >
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name='navicon' />
        </button>
        <nav className='flex gap-4'>
          <Link
            to='/'
            className={cn('uppercase', { underline: pathname === '/' })}
          >
            Home
          </Link>
          <Link
            to='/history'
            className={cn('uppercase', { underline: pathname === '/history' })}
          >
            History
          </Link>
        </nav>
      </Surface>
      <MenuDrawer isOpen={menuOpen} onMenuClose={() => setMenuOpen(false)} />
    </>
  );
};

const MenuDrawer = ({ isOpen, onMenuClose }) => {
  return (
    <div
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'bg-violet-700',
        'w-full',
        'h-full',
        'transition-all',
        {
          'opacity-0 pointer-events-none': !isOpen,
          'opacity-1': isOpen
        }
      )}
    >
      <button
        className='absolute top-2 right-2 w-10 h-10'
        onClick={() => onMenuClose()}
      >
        <Icon name='close' />
      </button>
      <div className='max-w-xs mx-auto py-10'>
        <ul className='flex flex-col gap-4 w-full'>
          <li>
            <GoalUpdate />
          </li>
          <li>
            <DelayUpdate />
          </li>
        </ul>
      </div>
    </div>
  );
};

const GoalUpdate = () => {
  const { goal, setGoal } = useContext(MainContext);
  const [updatedGoal, setUpdatedGoal] = useState(goal || 0);

  return (
    <div>
      <p className='mb-2'>Set your daily goal</p>
      <div className='flex h-10 w-full'>
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='100'
          onChange={(e) => setUpdatedGoal(parseInt(e.target.value))}
          value={updatedGoal}
        />
        <button
          className='bg-white text-violet-700 px-4 uppercase rounded rounded-l-none'
          onClick={() => setGoal(updatedGoal)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

const DelayUpdate = () => {
  const { delay, setDelay } = useContext(MainContext);
  const [updatedDelay, setUpdatedDelay] = useState([0, 0]);

  const hours = updatedDelay[0];
  const minutes = updatedDelay[1];

  const updateHours = (updatedHours) => {
    setUpdatedDelay([updatedHours, minutes]);
  };

  const updateMinutes = (updatedMinutes) => {
    setUpdatedDelay([hours, updatedMinutes]);
  };

  const delayToMs = () => {
    return (hours * 60 * 60 + minutes * 60) * 1000;
  };

  return (
    <div>
      <p className='mb-2'>Set your delay</p>
      <div className='flex h-10 w-full'>
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='100'
          onChange={(e) => updateHours(parseInt(e.target.value))}
          value={hours}
        />
        <input
          className='bg-transparent border-white border rounded rounded-r-none px-4'
          type='number'
          min='0'
          max='59'
          onChange={(e) => updateMinutes(parseInt(e.target.value))}
          value={minutes}
        />
        <button
          className='bg-white text-violet-700 px-4 uppercase rounded rounded-l-none'
          onClick={() => setDelay(delayToMs())}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Header;
