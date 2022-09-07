import { ActionTypes, Action } from '../actions/types';
import { Task } from '../types/Task';

// The real point of reducers is to handle actions.
// Reducers are pure functions that update state in response to actions.
export default (state = { tasks: [] as Task[] }, action: Action) => {
  if (action.type === ActionTypes.CREATE_TASK) {
    return { tasks: state.tasks.concat(action.payload) };
  }

  if (action.type === ActionTypes.EDIT_TASK) {
    const { payload } = action;
    return {
      tasks: state.tasks.map(task =>
        task.id === payload.id ? { ...task, ...payload.params } : task
      ),
    };
  }

  // The reducer listens for the server action
  if (action.type === ActionTypes.FETCH_TASKS_SUCCEEDED) {
    return {
      tasks: action.payload.tasks,
    };
  }

  return state;
};
