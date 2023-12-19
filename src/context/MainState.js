import React, { useReducer, useEffect } from 'react';
import MainContext from './MainContext';
import mainReducer from './mainReducer';

const MainState = ({ children }) => {
  const initialState = {
    goal: 0,
    cigarettes: []
  };
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const setCigarettes = (cigarettes) => {
    dispatch({
      type: 'LOAD_INITIAL_CIGARETTES',
      payload: cigarettes
    });
  };

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
  };

  useEffect(() => {
    setCigarettes(JSON.parse(localStorage.getItem('puchits') || '[]'));
    setGoal(JSON.parse(localStorage.getItem('puchits-goal')) || 0);
  }, []);

  return (
    <MainContext.Provider
      value={{ ...state, setGoal, addCigarette, removeCigarette }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
