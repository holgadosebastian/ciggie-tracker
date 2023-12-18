import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Home from './pages/home';
import History from './pages/history';

import Navbar from './layout/navbar';

import { updatePuchits, updateGoal } from './utils/utils';

const App = () => {
  const [puchits, setPuchits] = useState([]);
  const [goal, setGoal] = useState(0);
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
  const [activePuchitId, setActivePuchitId] = useState(null);

  useEffect(() => {
    const savedPuchits = localStorage.getItem('puchits')
      ? JSON.parse(localStorage.getItem('puchits'))
      : [];
    const savedGoal = localStorage.getItem('puchits-goal')
      ? JSON.parse(localStorage.getItem('puchits-goal'))
      : 0;
    setPuchits(savedPuchits);
    setGoal(savedGoal);

    setInterval(() => {
      setTodayDate(
        new Date().toLocaleDateString('en', {
          month: 'long',
          day: 'numeric'
        })
      );
    }, 1000);
  }, []);

  const onAddPuchit = () => {
    const newPuchit = {
      id: uuidv4(),
      date: new Date()
    };

    const updatedPuchits = [...puchits, newPuchit];
    setPuchits(updatedPuchits);
    updatePuchits(updatedPuchits);
  };

  const handleUpdateGoal = (goal) => {
    setGoal(goal);
    updateGoal(goal);
  };

  const onRemovePuchit = (puchitId) => {
    const updatedPuchits = puchits.filter(({ id }) => puchitId !== id);

    setPuchits(updatedPuchits);
    updatePuchits(updatedPuchits);
  };

  return (
    <Router>
      <Navbar goal={goal} onUpdateGoal={handleUpdateGoal} />
      <div>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                puchits={puchits}
                goal={goal}
                todayDate={todayDate}
                onAddPuchit={onAddPuchit}
                onRemovePuchit={onRemovePuchit}
                onSetActivePuchit={setActivePuchitId}
                activePuchitId={activePuchitId}
              />
            }
          ></Route>
          <Route
            path='/history'
            element={<History puchits={puchits} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
