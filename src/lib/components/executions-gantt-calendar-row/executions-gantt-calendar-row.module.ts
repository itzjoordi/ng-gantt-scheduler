import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExecutionsGanttCalendarRowComponent } from './executions-gantt-calendar-row.component';

/**
 * ExecutionsGanttCalendarRowModule
 */
@NgModule({
  declarations: [ExecutionsGanttCalendarRowComponent],
  imports: [CommonModule],
  exports: [ExecutionsGanttCalendarRowComponent],
})
export class ExecutionsGanttCalendarRowModule {}
