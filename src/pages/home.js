import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { getDailyPuchits, getTimeString } from '../utils/utils'

const Home = ({ todayDate, puchits, onAddPuchit, activePuchitId, onSetActivePuchit, onRemovePuchit }) => {
  const [todayPuchits, setTodayPuchits] = useState([])

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(puchits).reverse())
  }, [puchits])

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center items-center h-3/6">
        <p className="mb-2">{todayDate}</p>
        <div className="rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center">
          <span className="text-5xl">{todayPuchits.length}</span>
        </div>
        <button className="bg-white text-violet-700 px-6 py-2 mt-4 rounded" onClick={onAddPuchit}>ADD</button>
      </div>
      {todayPuchits.length > 0 && (
        <div className="h-3/6 overflow-y-auto p-4">
          <ul>
            {todayPuchits.map(({id, date}, index) => {
              return (
                <li
                  onClick={() => activePuchitId !== id ? onSetActivePuchit(id) : onSetActivePuchit(null)}
                  key={id}
                  className={cn('pl-4', 'pr-2', 'h-8', 'transition-colors', 'flex', 'justify-between', 'items-center', {
                    'mt-1': index > 0,
                    'bg-violet-900': activePuchitId !== id,
                    'bg-white': activePuchitId === id,
                    'text-violet-900': activePuchitId === id,
                  })}
                >
                  <p>{getTimeString(date)}</p>
                  {activePuchitId === id && (
                  <div className='flex'>
                    <div className='h-8 w-8 text-center leading-8' onClick={() => onRemovePuchit(id)}>D</div>
                    <div className='h-8 w-8 text-center leading-8' onClick={() => onSetActivePuchit(null)}>C</div>
                  </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>

  )
}

export default Home