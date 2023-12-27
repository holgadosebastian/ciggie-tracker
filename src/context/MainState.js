import React, { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MainContext from './MainContext';
import mainReducer from './mainReducer';

import {
  updateGoalStorage,
  updateDelayStorage,
  updateCigarettesStorage
} from '../lib/utils';

const MainState = ({ children }) => {
  const tabs = JSON.parse(localStorage.getItem('HABIT_TRACKER::TABS') || '[]');
  let currentTab;

  if (tabs.length === 0) {
    tabs.push({
      id: uuidv4(),
      name: 'Item 1',
      themeColor: 'violet',
      current: true
    });
    localStorage.setItem('HABIT_TRACKER::TABS', JSON.stringify(tabs));
    currentTab = tabs[0];
    localStorage.setItem(
      `HABIT_TRACKER::TAB::${currentTab.id}`,
      JSON.stringify({
        ...currentTab,
        occurrences: [],
        goal: 0,
        delay: 0
      })
    );
  } else {
    const currentTabId = tabs.find(({ current }) => current).id;
    currentTab = JSON.parse(
      localStorage.getItem(`HABIT_TRACKER::TAB::${currentTabId}`) || '{}'
    );
  }

  const initialState = {
    goal: parseInt(localStorage.getItem('puchits-goal') || '0'),
    delay: parseInt(localStorage.getItem('puchits-delay') || '0'),
    cigarettes: JSON.parse(localStorage.getItem('puchits') || '[]'),
    tabs,
    currentTab
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

  const setCurrentTab = (id) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.id === id
    }));

    localStorage.setItem('HABIT_TRACKER::TABS', JSON.stringify(updatedTabs));
    const updatedCurrentTab = updatedTabs.find(({ current }) => current);
    dispatch({
      type: 'SET_CURRENT_TAB',
      payload: updatedCurrentTab
    });
  };

  const addTab = (name, themeColor) => {
    const id = uuidv4();
    const newTab = {
      id,
      name,
      themeColor
    };

    localStorage.setItem(
      'HABIT_TRACKER::TABS',
      JSON.stringify([...tabs, newTab])
    );

    localStorage.setItem(
      `HABIT_TRACKER::TAB::${newTab.id}`,
      JSON.stringify(newTab)
    );

    dispatch({
      type: 'ADD_TAB',
      payload: newTab
    });
  };

  const removeTab = (id) => {
    dispatch({
      type: 'REMOVE_TAB',
      payload: id
    });
  };

  useEffect(() => {
    updateCigarettesStorage(state.cigarettes);
  }, [state.cigarettes]);

  useEffect(() => {
    updateGoalStorage(state.goal);
  }, [state.goal]);

  return (
    <MainContext.Provider
      value={{
        ...state,
        setGoal,
        setDelay,
        addCigarette,
        removeCigarette,
        addTab,
        setCurrentTab
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
