import { TASK_STATUSES } from '../types/Task';
import { CreateTaskAction, ActionTypes, EditTaskAction } from './types';

let _id = 1;
export const uniqueId = () => _id++;

// Actions are objects describing an event.
// Action creators are functions that return actions.
export const createTask = (
  title: string,
  description: string,
  status?: TASK_STATUSES
): CreateTaskAction => ({
  type: ActionTypes.CREATE_TASK,
  payload: {
    // Side effects can be handled in action creators.
    id: uniqueId(),
    title,
    description,
    status: status || TASK_STATUSES.UNSTARTED,
  },
});

export const editTask = (
  id: number,
  params: {
    status: TASK_STATUSES;
  }
): EditTaskAction => ({
  type: ActionTypes.EDIT_TASK,
  payload: {
    id,
    params,
  },
});
