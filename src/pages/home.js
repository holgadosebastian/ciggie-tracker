import React, { Fragment, useState, useEffect } from 'react'
import cn from 'classnames'

import { updatePuchits, getDailyPuchits, getTimeString } from '../utils/utils'

const Home = () => {
  const [puchits, setPuchits] = useState([])
  const [todayPuchits, setTodayPuchits] = useState([])
  const todayDate = (new Date()).toLocaleDateString()

  useEffect(() => {
    const savedPuchits = localStorage.getItem('puchits') ? JSON.parse(localStorage.getItem('puchits')) : []
    console.log('savedPuchits', savedPuchits)
    setPuchits(savedPuchits)
  }, [])

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(puchits))
  }, [puchits])

  const onAddPuchit = () => {
    const newPuchit = {
      date: new Date()
    }

    const updatedPuchits = [...puchits, newPuchit]
    setPuchits(updatedPuchits)
    updatePuchits(updatedPuchits)
  }

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center" style={{ height: '50vh' }}>
        <p className="mb-2">{todayDate}</p>
        <div className="rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center">
          <span className="text-5xl">{todayPuchits.length}</span>
        </div>
        <button className="bg-white text-violet-700 px-6 py-2 mt-4 rounded" onClick={onAddPuchit}>ADD</button>
      </div>
      {todayPuchits.length > 0 && (
        <div className="p-4 overflow-y-auto" style={{ height: '50vh' }}>
          <ul>
            {todayPuchits.map(({date}, index) => {
              console.log('index', index)
              return <li key={index} className={cn('px-4', 'py-2', 'bg-violet-900', { 'mt-1': index > 0 } )}>{getTimeString(date)}</li>
            })}
          </ul>
        </div>
      )}
    </Fragment>

  )
}

export default Home