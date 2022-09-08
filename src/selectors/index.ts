import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task, TASK_STATUSES } from '../types/Task';

const getTasks = (state: RootState) => state.tasks.tasks;
const getSearchTerm = (state: RootState) => state.tasks.searchTerm;

const { UNSTARTED, Completed, IN_PROGRESS } = TASK_STATUSES;

const taskStatuses = [UNSTARTED, Completed, IN_PROGRESS];

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) =>
    tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {} as Record<TASK_STATUSES, Task[]>;

    for (const status of taskStatuses) {
      grouped[status] = tasks.filter(task => task.status === status);
    }

    return grouped;
  }
);
