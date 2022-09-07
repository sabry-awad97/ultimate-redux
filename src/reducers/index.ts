import { ActionTypes, Action } from '../actions/types';
import { Task } from '../types/Task';

const initialState = { isLoading: false, tasks: [] as Task[] };

// The real point of reducers is to handle actions.
// Reducers are pure functions that update state in response to actions.
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };

    case ActionTypes.EDIT_TASK_SUCCEEDED:
      const { payload } = action;
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === payload.task.id ? { ...task, ...payload.task } : task
        ),
      };

    case ActionTypes.FETCH_TASKS_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.FETCH_TASKS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };

    case ActionTypes.DELETE_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
      };

    default:
      return state;
  }
};
