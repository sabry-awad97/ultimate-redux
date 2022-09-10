import { ActionTypes, Action } from '../actions/types';
import { Task } from '../types/Task';

const initialState = {
  searchTerm: '',
  error: '',
  isLoading: false,
  items: [] as Task[],
  tasks: {} as { [id: string]: Task },
};

// The real point of reducers is to handle actions.
// Reducers are pure functions that update state in response to actions.
export const tasks = (
  state = initialState,
  action: Action
): typeof initialState => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ENTITIES: {
      const { tasks } = action.payload;
      if (tasks) {
        return {
          ...state,
          isLoading: false,
          tasks,
        };
      }

      return state;
    }

    case ActionTypes.TIMER_INCREMENTED:
      const nextTasks = Object.keys(state.tasks).map(taskId => {
        const task = state.tasks[taskId];
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });

      return {
        ...state,
        items: nextTasks,
      };

    case ActionTypes.FILTER_TASKS:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case ActionTypes.TIMER_INCREMENTED:
      return {
        ...state,
        items: state.items.map(task =>
          task.id === action.payload.taskId
            ? { ...task, timer: task.timer + 1 }
            : task
        ),
      };

    // case ActionTypes.CREATE_TASK_SUCCEEDED:
    //   return {
    //     ...state,
    //     items: state.items.concat(action.payload),
    //   };

    case ActionTypes.CREATE_TASK_SUCCEEDED:
      const task = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
      };

    case ActionTypes.EDIT_TASK_SUCCEEDED:
      const { payload } = action;
      return {
        ...state,
        items: state.items.map(task =>
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
        items: action.payload,
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
        items: state.items.filter(task => task.id !== action.payload.id),
      };

    default:
      return state;
  }
};
