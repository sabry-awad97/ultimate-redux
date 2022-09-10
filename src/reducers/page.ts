import { Action, ActionTypes } from '../actions/types';

const initialPageState = {
  currentProjectId: null as null | number,
  searchTerm: '',
};

export function page(state = initialPageState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PROJECT_ID:
      return {
        ...state,
        currentProjectId: action.payload.id,
      };

    case ActionTypes.FILTER_TASKS:
      return { ...state, searchTerm: action.payload.searchTerm };

    default:
      return state;
  }
}
