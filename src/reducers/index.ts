import { ActionTypes, Action } from '../actions/types';
import { Task } from '../types/Task';

const initialState = {
  searchTerm: '',
  error: '',
  isLoading: false,
  tasks: [] as Task[],
};

// The real point of reducers is to handle actions.
// Reducers are pure functions that update state in response to actions.
export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case ActionTypes.FILTER_TASKS:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case ActionTypes.TIMER_INCREMENTED:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, timer: task.timer + 1 }
            : task
        ),
      };

    case ActionTypes.CREATE_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: state.tasks.concat(action.payload),
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
        tasks: action.payload,
      };

    case ActionTypes.FETCH_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
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

export const getFilteredTasks = (tasks: Task[], searchTerm: string): Task[] =>
  tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')));
