import * as actions from './actions';
import {
  CreateTaskSucceededAction,
  FetchTasksSucceededAction,
} from './actions/types';
import configureStore from './store';
import { TASK_STATUSES } from './types/Task';

const store = configureStore();

// fetching tasks when the app loads
await (store.dispatch(
  actions.fetchTasks()
) as unknown as Promise<FetchTasksSucceededAction>);

// creating tasks
// creating tasks
const action = store.dispatch(
  actions.createTask('Peace on Earth', 'No big deal.')
) as unknown as Promise<CreateTaskSucceededAction>;

// Editing tasks
await store.dispatch(
  actions.editTask((await action).payload.id, {
    status: TASK_STATUSES.Completed,
  })
);

// deleting tasks
await store.dispatch(actions.deleteTask((await action).payload.id));
