import React, { Fragment, useState, useEffect } from 'react'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import Header from '../layout/header'
import { updatePuchits, getDailyPuchits, getTimeString, getGroupedPuchits } from '../utils/utils'

const Home = () => {
  const [puchits, setPuchits] = useState([])
  const [todayPuchits, setTodayPuchits] = useState([])
  const [currentView, setCurrentView] = useState('tracker')
  const todayDate = (new Date()).toLocaleDateString()

  useEffect(() => {
    const savedPuchits = localStorage.getItem('puchits') ? JSON.parse(localStorage.getItem('puchits')) : []
    setPuchits(savedPuchits)
  }, [])

  useEffect(() => {
    setTodayPuchits(getDailyPuchits(puchits))
  }, [puchits])

  const onToggleView = () => {
    const newView = currentView === 'tracker' ? 'history' : 'tracker'

    setCurrentView(newView)
  }

  const onAddPuchit = () => {
    const newPuchit = {
      id: uuidv4(),
      date: new Date()
    }

    const updatedPuchits = [...puchits, newPuchit]
    setPuchits(updatedPuchits)
    updatePuchits(updatedPuchits)
  }

  const groupedPuchits = getGroupedPuchits(puchits)

  return (
    <div className="h-screen">
      <Header onToggleView={onToggleView}/>
      {currentView === 'tracker' ?
        <Fragment>
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
        </Fragment> :
        <div className="pt-12 px-4 pb-4 grid grid-cols-3 gap-4">
          {Object.keys(groupedPuchits).map((keyName, keyIndex) => {
            const { count } = groupedPuchits[keyName]
            return (
              <div className="text-center p-2 bg-violet-900 rounded-md">
                <p className="mb-2 text-xs">{keyName}</p>
                <p className="text-3xl">
                  <span className="inline-block">{count}</span>
                </p>
              </div>
            )
          })}
        </div>
      }
    </div>

  )
}

export default Home