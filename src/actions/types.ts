import { Task, TASK_STATUSES } from '../types/Task';

export const enum ActionTypes {
  EDIT_TASK = 'EDIT_TASK',
  FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED',
  CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED',
}

export interface EditTaskAction {
  type: ActionTypes.EDIT_TASK;
  payload: {
    id: string;
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

export interface CreateTaskSucceededAction {
  type: ActionTypes.CREATE_TASK_SUCCEEDED;
  payload: {
    task: Task;
  };
}

export type Action =
  | EditTaskAction
  | FetchTasksSucceededAction
  | CreateTaskSucceededAction;
