import { schema } from 'normalizr';

import { Project } from '../types/Project';
import { Task } from '../types/Task';
const taskSchema = new schema.Entity<Task>('tasks');
export const projectSchema = new schema.Entity<Project>('projects', {
  tasks: [taskSchema],
});
