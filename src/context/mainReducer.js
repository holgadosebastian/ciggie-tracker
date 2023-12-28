export default (state, action) => {
  const { currentTab } = state;

  switch (action.type) {
    case 'ADD_TAB':
      return {
        ...state,
        tabs: [...state.tabs, action.payload]
      };
    case 'SET_CURRENT_TAB':
      return {
        ...state,
        currentTab: action.payload
      };
    case 'UPDATE_TAB':
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (action.payload.id === tab.id) {
            return {
              ...tab,
              ...action.payload
            };
          }

          return tab;
        }),
        currentTab: action.payload
      };
    case 'ADD_OCCURRENCE':
      const { occurrences } = currentTab;

      return {
        ...state,
        currentTab: {
          ...currentTab,
          occurrences: [...occurrences, action.payload]
        }
      };
    case 'REMOVE_OCCURRENCE':
      return {
        ...state,
        currentTab: {
          ...currentTab,
          occurrences: currentTab.occurrences.filter(
            ({ id }) => id !== action.payload
          )
        }
      };
    case 'SET_GOAL': {
      const { currentTab } = state;

      return {
        ...state,
        currentTab: {
          ...currentTab,
          goal: action.payload
        }
      };
    }
    case 'SET_DELAY': {
      const { currentTab } = state;

      return {
        ...state,
        currentTab: {
          ...currentTab,
          delay: action.payload
        }
      };
    }
    default:
      return state;
  }
};
