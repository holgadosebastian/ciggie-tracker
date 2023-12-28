import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Surface } from '../components';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Surface
        as='header'
        className='fixed inset-x-0 top-0 py-2 px-4 h-10 flex gap-x-3 justify-between'
      >
        <nav className='flex gap-4'>
          <Link
            to='/'
            className={cn('uppercase', { underline: pathname === '/' })}
          >
            Home
          </Link>
          {/* <Link
            to='/history'
            className={cn('uppercase', { underline: pathname === '/history' })}
          >
            History
          </Link> */}
        </nav>
      </Surface>
    </>
  );
};

export default Header;
