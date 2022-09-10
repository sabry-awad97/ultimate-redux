import * as actions from './actions';
import { waitFor } from './helpers/waitFor';
import configureStore from './store';

const store = configureStore();

store.dispatch(actions.fetchTasksStarted());
store.dispatch(actions.fetchProjects());
await waitFor(1000);
