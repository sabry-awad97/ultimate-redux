import * as api from '../api';
import { AppThunk } from '../types/AppThunk';
import { Task } from '../types/Task';
import { FetchTasksSucceededAction, ActionTypes } from './types';

export const fetchTasksSucceeded = (
  tasks: Task[]
): FetchTasksSucceededAction => ({
  type: ActionTypes.FETCH_TASKS_SUCCEEDED,
  payload: {
    tasks,
  },
});

export const fetchTasks =
  (): AppThunk<Promise<FetchTasksSucceededAction>> => dispatch =>
    api.fetchTasks().then(({ data }) => dispatch(fetchTasksSucceeded(data)));
