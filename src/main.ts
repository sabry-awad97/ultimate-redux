import * as actions from './actions';
import {
  CreateTaskSucceededAction,
  FetchTasksSucceededAction,
} from './actions/types';
import configureStore from './store';
import { TASK_STATUSES } from './types/Task';

const store = configureStore();

// fetching tasks when the app loads
// await (store.dispatch(
//   actions.fetchTasks()
// ) as unknown as Promise<FetchTasksSucceededAction>);

await (store.dispatch(
  actions.fetchTasksStarted()
) as unknown as Promise<FetchTasksSucceededAction>);

// creating tasks
const action = await store.dispatch(
  actions.createTask('Peace on Earth', 'No big deal.')
);

// Editing tasks
await store.dispatch(
  actions.editTask(action.payload.id, {
    status: TASK_STATUSES.Completed,
  })
);

// deleting tasks
await store.dispatch(actions.deleteTask(action.payload.id));
