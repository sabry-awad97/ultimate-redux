import { ActionTypes, AnyAction } from '../actions/types';
import { Task } from '../types/Task';

const mockTasks: Task[] = [];

// The real point of reducers is to handle actions.
export default (state = { tasks: mockTasks }, action: AnyAction) => {
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

  return state;
};
