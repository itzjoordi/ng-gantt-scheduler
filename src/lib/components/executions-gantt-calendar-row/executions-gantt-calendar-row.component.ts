import {
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  Input,
  afterNextRender,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { startOfDay } from 'date-fns';
import { ExecutionsGanttCalendarDateCildrenInterface } from '../../interfaces/executions-gantt-calendar-date-cildren.interface';
import { ExecutionsGanttCalendarDateInterface } from '../../interfaces/executions-gantt-calendar-date.interface';

@Component({
  selector: 'app-executions-gantt-calendar-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './executions-gantt-calendar-row.component.html',
  styleUrls: ['./executions-gantt-calendar-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttCalendarRowComponent {
  @Input() items!: ExecutionsGanttCalendarDateInterface[];
  @Input() type!: string;
  @Input() viewMonth!: boolean;

  constructor() {
    afterNextRender(
      () => {
        this.initialize();
      },
      { phase: AfterRenderPhase.Write },
    );
  }

  /**
   * After render
   */
  initialize(): void {
    const todayTime: number = startOfDay(new Date()).getTime();
    const todayId: string = `${todayTime}d`;
    const existToday: boolean = this.items?.some(
      (item: ExecutionsGanttCalendarDateInterface) => item.key === todayId,
    );
    if (existToday) {
      document.getElementById(todayId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  trackByItemsFn(
    index: number,
    item: ExecutionsGanttCalendarDateInterface,
  ): string {
    return `${item.key}`;
  }

  trackByCildrenFn(
    index: number,
    child: ExecutionsGanttCalendarDateCildrenInterface,
  ): string {
    return `${child.key}`;
  }
}
