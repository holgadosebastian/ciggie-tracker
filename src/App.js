import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import Home from './pages/home'
import History from './pages/history'

import Navbar from './layout/navbar'

import { updatePuchits } from './utils/utils'

const App = () => {
  const [puchits, setPuchits] = useState([])
  const [todayDate, setTodayDate] = useState((new Date()).toLocaleDateString())
  const [activePuchitId, setActivePuchitId] = useState(null)

  useEffect(() => {
    const savedPuchits = localStorage.getItem('puchits') ? JSON.parse(localStorage.getItem('puchits')) : []
    setPuchits(savedPuchits)

    setInterval(() => {
      setTodayDate((new Date()).toLocaleDateString())
    }, 1000)
  }, [])

  const onAddPuchit = () => {
    const newPuchit = {
      id: uuidv4(),
      date: new Date()
    }

    const updatedPuchits = [...puchits, newPuchit]
    setPuchits(updatedPuchits)
    updatePuchits(updatedPuchits)
  }

  const onRemovePuchit = puchitId => {
    const updatedPuchits = puchits.filter(({ id }) => puchitId !== id)

    setPuchits(updatedPuchits)
    updatePuchits(updatedPuchits)
  }
  
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route
            path='/'
            element={<Home puchits={puchits} todayDate={todayDate} onAddPuchit={onAddPuchit} onRemovePuchit={onRemovePuchit} onSetActivePuchit={setActivePuchitId} activePuchitId={activePuchitId} />}
          />
          <Route
            path='/history'
            element={<History puchits={puchits} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
