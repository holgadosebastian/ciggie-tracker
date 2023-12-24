import React, { useReducer, useEffect } from 'react';

import MainContext from './MainContext';
import mainReducer from './mainReducer';

import {
  updateGoalStorage,
  updateDelayStorage,
  updateCigarettesStorage
} from '../lib/utils';

const MainState = ({ children }) => {
  const initialState = {
    goal: parseInt(localStorage.getItem('puchits-goal') || '0'),
    delay: parseInt(localStorage.getItem('puchits-delay') || '0'),
    cigarettes: JSON.parse(localStorage.getItem('puchits') || '[]')
  };
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const addCigarette = (cigarette) => {
    dispatch({
      type: 'ADD_CIGARETTE',
      payload: cigarette
    });
  };

  const removeCigarette = (cigaretteId) => {
    dispatch({
      type: 'REMOVE_CIGARETTE',
      payload: cigaretteId
    });
  };

  const setGoal = (goal) => {
    dispatch({
      type: 'SET_GOAL',
      payload: goal
    });
    updateGoalStorage(goal);
  };

  const setDelay = (delay) => {
    dispatch({
      type: 'SET_DELAY',
      payload: delay
    });
    updateDelayStorage(delay);
  };

  useEffect(() => {
    updateCigarettesStorage(state.cigarettes);
  }, [state.cigarettes]);

  useEffect(() => {
    updateGoalStorage(state.goal);
  }, [state.goal]);

  return (
    <MainContext.Provider
      value={{ ...state, setGoal, setDelay, addCigarette, removeCigarette }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
