import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Icon } from '../components';
import MainContext from '../context/MainContext';

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className='fixed inset-x-0 top-0 py-2 px-4 flex gap-x-3 justify-between bg-violet-700'>
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
      </header>
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
        <ul className='flex w-full'>
          <li>
            <GoalUpdate />
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

export default Header;
