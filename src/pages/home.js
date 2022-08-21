import React, { Fragment, useState, useEffect } from 'react'

import { updatePuchits, getTimeString } from '../utils/utils'

const Home = () => {
  const [puchits, setPuchits] = useState([])
  const todayDate = (new Date()).toLocaleDateString()

  useEffect(() => {
    const savedPuchits = localStorage.getItem('puchits') ? JSON.parse(localStorage.getItem('puchits')) : []
    console.log('savedPuchits', savedPuchits)
    setPuchits(savedPuchits)
  }, [])

  const onAddPuchit = () => {
    const newPuchit = {
      date: new Date()
    }

    const updatedPuchits = [...puchits, newPuchit]
    setPuchits(updatedPuchits)
    updatePuchits(updatedPuchits)
  }

  console.log('puchits', puchits)

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center" style={{ height: '50vh' }}>
        <p className="mb-2">{todayDate}</p>
        <div className="rounded-full border-4 border-solid border-white w-32 h-32 flex justify-center items-center">
          <span className="text-5xl">{puchits.length}</span>
        </div>
        <button className="bg-white text-violet-700 px-6 py-2 mt-4 rounded" onClick={onAddPuchit}>ADD</button>
      </div>
      {puchits.length > 0 && (
        <div className="p-4 overflow-y-auto" style={{ height: '50vh' }}>
          <ul>
            {puchits.map(({date}, index) => {
              return <li key={index} className="px-4 py-2 mt-1 bg-violet-900">{getTimeString(date)}</li>
            })}
          </ul>
        </div>
      )}
    </Fragment>

  )
}

export default Home