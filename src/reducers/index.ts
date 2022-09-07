import { ActionTypes, Action } from '../actions/types';
import { Task } from '../types/Task';

// The real point of reducers is to handle actions.
// Reducers are pure functions that update state in response to actions.
export default (state = { tasks: [] as Task[] }, action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TASK_SUCCEEDED:
      return { tasks: state.tasks.concat(action.payload.task) };

    case ActionTypes.EDIT_TASK:
      const { payload } = action;
      return {
        tasks: state.tasks.map(task =>
          task.id === payload.id ? { ...task, ...payload.params } : task
        ),
      };

    case ActionTypes.FETCH_TASKS_SUCCEEDED:
      return {
        tasks: action.payload.tasks,
      };

    default:
      return state;
  }
};
