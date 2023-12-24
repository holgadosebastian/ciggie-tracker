import React, { useReducer, useEffect } from 'react';

import MainContext from './MainContext';
import mainReducer from './mainReducer';

import { updateGoalStorage, updateCigarettesStorage } from '../lib/utils';

const MainState = ({ children }) => {
  const initialState = {
    goal: parseInt(localStorage.getItem('puchits-goal') || '0'),
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

  useEffect(() => {
    updateCigarettesStorage(state.cigarettes);
  }, [state.cigarettes]);

  useEffect(() => {
    updateGoalStorage(state.goal);
  }, [state.goal]);

  return (
    <MainContext.Provider
      value={{ ...state, setGoal, addCigarette, removeCigarette }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
