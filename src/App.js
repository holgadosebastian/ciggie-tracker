import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Habit from './pages/Habit';
import History from './pages/History';
import Dashboard from './pages/Dashboard';

import Header from './layout/Header';
import MainState from './context/MainState';

const App = () => {
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());

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
        {/* <Header /> */}
        <div className='py-5'>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route
              path='/habit/:habitId'
              element={<Habit todayDate={todayDate} />}
            ></Route>
            <Route path='/history' element={<History />}></Route>
          </Routes>
        </div>
      </Router>
    </MainState>
  );
};

export default App;
