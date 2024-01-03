import React, { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MainContext from './MainContext';
import mainReducer from './mainReducer';

import {
  storeTabInfo,
  getStoredTabInfo,
  storeTabsData,
  getStoredTabsData
} from '../lib/utils';

const MainState = ({ children }) => {
  const tabs = getStoredTabsData();

  const initialState = {
    tabs,
    currentTab: null
  };
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const addOcurrence = (ocurrence = {}) => {
    const { currentTab } = state;
    const newOcurrence = {
      id: uuidv4(),
      date: ocurrence.date || Date.now()
    };

    storeTabInfo(currentTab.id, {
      ...currentTab,
      occurrences: [...currentTab.occurrences, newOcurrence]
    });

    dispatch({
      type: 'ADD_OCCURRENCE',
      payload: newOcurrence
    });
  };

  const removeOccurrence = (id) => {
    const { currentTab } = state;
    storeTabInfo(currentTab.id, {
      ...currentTab,
      occurrences: currentTab.occurrences.filter(
        (occurrence) => occurrence.id !== id
      )
    });

    dispatch({
      type: 'REMOVE_OCCURRENCE',
      payload: id
    });
  };

  const setGoal = (goal) => {
    const { currentTab } = state;

    storeTabInfo(currentTab.id, {
      ...currentTab,
      goal
    });

    dispatch({
      type: 'SET_GOAL',
      payload: goal
    });
  };

  const setDelay = (delay) => {
    const { currentTab } = state;

    storeTabInfo(currentTab.id, {
      ...currentTab,
      delay
    });

    dispatch({
      type: 'SET_DELAY',
      payload: delay
    });
  };

  const setCurrentTab = (id) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.id === id
    }));

    storeTabsData(updatedTabs);
    const updatedCurrentTab = getStoredTabInfo(id);

    dispatch({
      type: 'SET_CURRENT_TAB',
      payload: updatedCurrentTab
    });
  };

  const addTab = ({ name, themeColor, icon }) => {
    const id = uuidv4();
    const newTab = {
      id,
      name,
      icon,
      themeColor
    };

    storeTabsData([...tabs, newTab]);
    storeTabInfo(newTab.id, { ...newTab, occurrences: [], goal: 0, delay: 0 });

    dispatch({
      type: 'ADD_TAB',
      payload: newTab
    });
  };

  const updateTab = (data = {}) => {
    const { currentTab } = state;

    storeTabsData(
      tabs.map((tab) => {
        if (currentTab.id === tab.id) {
          return {
            ...tab,
            ...(data.name ? { name: data.name } : {})
          };
        }

        return tab;
      })
    );

    storeTabInfo(currentTab.id, { ...currentTab, ...data });

    dispatch({
      type: 'UPDATE_TAB',
      payload: {
        ...currentTab,
        ...data
      }
    });
  };

  const removeTab = (id) => {
    storeTabsData([...tabs.filter((tab) => tab.id !== id)]);

    dispatch({
      type: 'REMOVE_TAB',
      payload: id
    });
  };

  return (
    <MainContext.Provider
      value={{
        ...state,
        setGoal,
        setDelay,
        addOcurrence,
        removeOccurrence,
        addTab,
        setCurrentTab,
        updateTab,
        removeTab
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
