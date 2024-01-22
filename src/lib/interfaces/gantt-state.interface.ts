import { OptionsActionsInterface } from './options-actions.interface';
import { OptionsCalendarInterface } from './options-calendar.interface';
import { OptionsTimesInterface } from './options-times.interface';
import { Task } from './task.interface';

/**
 * GanttState
 */
export interface GanttState {
  tasks: Task[];
  viewMode: ViewMode;
  times: OptionsTimesInterface;
  calendar: OptionsCalendarInterface;
  options: OptionsActionsInterface;
  yearSelected: number;
  useLimit: boolean;
}

export type ViewMode = 'month' | 'day';

export const ganttInitialState: GanttState = {
  tasks: [],
  viewMode: 'month',
  times: {
    width: 0,
    timePerPixel: 0,
    firstTaskTime: 0,
    lastTaskTime: 0,
    firstTime: 0,
    lastTime: 0,
    steps: [],
  },
  calendar: {
    day: { display: true, widths: [] },
    month: { display: true, widths: [] },
    year: { display: false, widths: [] },
  },
  options: {
    update: false,
    delete: false,
  },
  yearSelected: 0,
  useLimit: true,
};
