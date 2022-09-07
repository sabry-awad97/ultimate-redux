import { uniqueId } from '../actions';

const mockTasks = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
  },
  {
    id: uniqueId(),
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress',
  },
];

enum TASK_STATUSES {
  UNSTARTED = 'Unstarted',
  IN_PROGRESS = 'In Progress',
  Completed = 'Completed',
}

interface CreateTaskAction {
  type: 'CREATE_TASK';
  payload: {
    id: number;
    title: string;
    description: string;
    status: TASK_STATUSES;
  };
}

// The real point of reducers is to handle actions.
export default (state = { tasks: mockTasks }, action: CreateTaskAction) => {
  if (action.type === 'CREATE_TASK') {
    return { tasks: state.tasks.concat(action.payload) };
  }
  return state;
};
