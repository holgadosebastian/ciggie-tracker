import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <div className="fixed inset-x-0 top-0 py-2 px-4 flex gap-x-3 justify-center">
      <Link to="/" className={cn('uppercase', { 'underline': pathname === '/' })}>Home</Link>
      <Link to="/history" className={cn('uppercase', { 'underline': pathname === '/history' })}>History</Link>
    </div>
  )
}

export default Navbar