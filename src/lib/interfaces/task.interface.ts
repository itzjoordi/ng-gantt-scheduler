import { User } from './user';

/**
 * Task
 */
export interface Task {
  id: string;
  label: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  offsetPre?: number;
  offsetPost?: number;
  color?: string;
  asignedTo?: User;
  collapsed?: boolean;
  childs: Task[];
}
