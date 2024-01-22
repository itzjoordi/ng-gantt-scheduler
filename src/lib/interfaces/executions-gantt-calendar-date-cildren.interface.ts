/**
 * ExecutionsGanttCalendarDateCildrenInterface
 */
export interface ExecutionsGanttCalendarDateCildrenInterface {
  index: number;
  time: number;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  textWidth: number;
  label: string;
  isWeekend?: boolean;
  isToday?: boolean;
}
