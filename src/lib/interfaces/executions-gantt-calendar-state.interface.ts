import { ExecutionsGanttCalendarDatesInterface } from './executions-gantt-calendar-dates.interface';

/**
 * ExecutionsGanttCalendarStateInterface
 */
export interface ExecutionsGanttCalendarStateInterface {
  dates: ExecutionsGanttCalendarDatesInterface;
}

export const executionsGanttCalendarInitialState: ExecutionsGanttCalendarStateInterface = {
  dates: {
    days: [],
    months: [],
    years: []
  }
};
