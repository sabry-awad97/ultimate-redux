import { AnyAction } from '../actions';
import { Task } from '../types/Task';

const mockTasks: Task[] = [];

// The real point of reducers is to handle actions.
export default (state = { tasks: mockTasks }, action: AnyAction) => {
  if (action.type === 'CREATE_TASK') {
    return { tasks: state.tasks.concat(action.payload) };
  }
  return state;
};
