import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import History from './pages/History';

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
        <Header />
        <div>
          <Routes>
            <Route path='/' element={<Home todayDate={todayDate} />}></Route>
            <Route path='/history' element={<History />}></Route>
          </Routes>
        </div>
      </Router>
    </MainState>
  );
};

export default App;
