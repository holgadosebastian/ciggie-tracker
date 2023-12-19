import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import History from './pages/history';

import Navbar from './layout/navbar';
import MainState from './context/MainState';

const App = () => {
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
  const [activePuchitId, setActivePuchitId] = useState(null);

  useEffect(() => {
    setInterval(() => {
      setTodayDate(
        new Date().toLocaleDateString('en', {
          month: 'long',
          day: 'numeric'
        })
      );
    }, 1000);
  }, []);

  return (
    <MainState>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  todayDate={todayDate}
                  onSetActivePuchit={setActivePuchitId}
                  activePuchitId={activePuchitId}
                />
              }
            ></Route>
            <Route path='/history' element={<History />}></Route>
          </Routes>
        </div>
      </Router>
    </MainState>
  );
};

export default App;
