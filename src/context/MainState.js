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

const updateThemeColor = (colorName) => {
  document.documentElement.setAttribute('theme', colorName);
};

const MainState = ({ children }) => {
  const tabs = getStoredTabsData();
  let currentTab;

  if (tabs.length === 0) {
    tabs.push({
      id: uuidv4(),
      name: 'Item 1',
      themeColor: 'violet',
      current: true
    });
    storeTabsData(tabs);
    currentTab = {
      ...tabs[0],
      occurrences: [],
      goal: 0,
      delay: 0
    };
    storeTabInfo(currentTab.id, currentTab);
  } else {
    const currentTabId = tabs.find(({ current }) => current).id;
    currentTab = getStoredTabInfo(currentTabId);
  }

  const initialState = {
    tabs,
    currentTab
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
      type: 'ADD_OCURRENCE',
      payload: newOcurrence
    });
  };

  const removeCigarette = (cigaretteId) => {
    dispatch({
      type: 'REMOVE_CIGARETTE',
      payload: cigaretteId
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

    updateThemeColor(updatedCurrentTab.themeColor);
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

    storeTabsData([...tabs, newTab]);
    storeTabInfo(newTab.id, { ...newTab, occurrences: [], goal: 0, delay: 0 });

    dispatch({
      type: 'ADD_TAB',
      payload: newTab
    });
  };

  const updateTab = (data = {}) => {
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

  /**
   * TODO: Add remove functionality
   */
  const removeTab = (id) => {
    dispatch({
      type: 'REMOVE_TAB',
      payload: id
    });
  };

  useEffect(() => {
    updateThemeColor(currentTab.themeColor);
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...state,
        setGoal,
        setDelay,
        addOcurrence,
        removeCigarette,
        addTab,
        setCurrentTab,
        updateTab
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
