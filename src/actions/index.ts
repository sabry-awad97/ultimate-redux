import { TASK_STATUSES } from '../types/Task';
import { CreateTaskAction, ActionTypes } from './types';

let _id = 1;
export const uniqueId = () => _id++;

export const createTask = (
  title: string,
  description: string,
  status?: TASK_STATUSES
): CreateTaskAction => ({
  type: ActionTypes.CREATE_TASK,
  payload: {
    id: uniqueId(),
    title,
    description,
    status: status || TASK_STATUSES.UNSTARTED,
  },
});
