import { Task, TASK_STATUSES } from '../types/Task';

export const enum ActionTypes {
  CREATE_TASK = 'CREATE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED',
}

export interface CreateTaskAction {
  type: ActionTypes.CREATE_TASK;
  payload: {
    id: number;
    title: string;
    description: string;
    status: TASK_STATUSES;
  };
}

export interface EditTaskAction {
  type: ActionTypes.EDIT_TASK;
  payload: {
    id: number;
    params: {
      status: TASK_STATUSES;
    };
  };
}

export interface FetchTasksSucceededAction {
  type: ActionTypes.FETCH_TASKS_SUCCEEDED;
  payload: {
    tasks: Task[];
  };
}

export type Action =
  | CreateTaskAction
  | EditTaskAction
  | FetchTasksSucceededAction;
