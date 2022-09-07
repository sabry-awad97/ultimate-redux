import { Task } from '../types/Task';
import {
  ActionTypes,
  FetchTasksSucceededAction,
  CreateTaskSucceededAction,
  EditTaskSucceededAction,
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

export const editTaskSucceeded = (task: Task): EditTaskSucceededAction => ({
  type: ActionTypes.EDIT_TASK_SUCCEEDED,
  payload: {
    task,
  },
});
