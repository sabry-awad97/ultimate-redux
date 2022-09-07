import { Task } from '../types/Task';
import {
  FetchTasksSucceededAction,
  ActionTypes,
  CreateTaskSucceededAction,
} from './types';

export const fetchTasksSucceeded = (
  tasks: Task[]
): FetchTasksSucceededAction => ({
  type: ActionTypes.FETCH_TASKS_SUCCEEDED,
  payload: {
    tasks,
  },
});

export const createTaskSucceeded = (task: Task): CreateTaskSucceededAction => ({
  type: ActionTypes.CREATE_TASK_SUCCEEDED,
  payload: {
    task,
  },
});
