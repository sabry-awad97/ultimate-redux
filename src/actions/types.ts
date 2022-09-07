import { TASK_STATUSES } from '../types/Task';

export const enum ActionTypes {
  CREATE_TASK = 'CREATE_TASK',
  EDIT_TASK = 'EDIT_TASK',
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

export type AnyAction = CreateTaskAction | EditTaskAction;
