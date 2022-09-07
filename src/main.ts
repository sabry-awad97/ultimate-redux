import * as actions from './actions';
import configureStore from './store';
import { TASK_STATUSES } from './types/Task';

const store = configureStore();

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

// fetching tasks when the app loads
await store.dispatch(actions.fetchTasks());

// creating tasks
const action = await store.dispatch(
  actions.createTask('Peace on Earth', 'No big deal.')
);

// Editing tasks
await store.dispatch(
  actions.editTask(action.payload.task.id, { status: TASK_STATUSES.Completed })
);

// deleting tasks
await store.dispatch(actions.deleteTask(action.payload.task.id));
