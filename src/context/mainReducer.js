import { v4 as uuidv4 } from 'uuid';

export default (state, action) => {
  switch (action.type) {
    case 'ADD_CIGARETTE':
      return {
        ...state,
        cigarettes: [
          ...state.cigarettes,
          {
            id: uuidv4(),
            date: Date.now()
          }
        ]
      };
    case 'REMOVE_CIGARETTE':
      return {
        ...state,
        cigarettes: state.cigarettes.filter(({ id }) => id !== action.payload)
      };
    case 'SET_GOAL': {
      return {
        ...state,
        goal: action.payload
      };
    }
    case 'SET_DELAY': {
      return {
        ...state,
        delay: action.payload
      };
    }
    default:
      return state;
  }
};
