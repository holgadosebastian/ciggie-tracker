export default (state, action) => {
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
    case 'ADD_OCURRENCE':
      const { currentTab } = state;
      const { occurrences } = currentTab;

      return {
        ...state,
        currentTab: {
          ...currentTab,
          occurrences: [...occurrences, action.payload]
        }
      };
    case 'REMOVE_CIGARETTE':
      return {
        ...state,
        cigarettes: state.cigarettes.filter(({ id }) => id !== action.payload)
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
