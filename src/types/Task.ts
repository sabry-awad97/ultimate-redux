export const enum TASK_STATUSES {
  UNSTARTED = 'Unstarted',
  IN_PROGRESS = 'In Progress',
  Completed = 'Completed',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TASK_STATUSES;
}
