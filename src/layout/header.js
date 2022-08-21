import React from 'react'

const Header = ({ onToggleView }) => {
  return (
    <div className="fixed inset-x-0 top-0 py-2 px-4 text-right">
      <span onClick={onToggleView} className="uppercase underline">History</span>
    </div>
  )
}

export default Header