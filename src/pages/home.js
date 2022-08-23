import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { getDailyPuchits, getTimeString } from '../utils/utils'

const Home = ({ todayDate, puchits, onAddPuchit }) => {
  const [todayPuchits, setTodayPuchits] = useState([])

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(puchits))
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
              return <li key={id} className={cn('px-4', 'py-2', 'bg-violet-900', { 'mt-1': index > 0 } )}>{getTimeString(date)}</li>
            })}
          </ul>
        </div>
      )}
    </div>

  )
}

export default Home