export enum TASK_STATUSES {
  UNSTARTED = 'Unstarted',
  IN_PROGRESS = 'In Progress',
  Completed = 'Completed',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TASK_STATUSES;
  timer: number;
  projectId?: number;
}
