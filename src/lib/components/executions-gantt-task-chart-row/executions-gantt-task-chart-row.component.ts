import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { isWeekend } from 'date-fns';
import { GridLinesInterface } from '../../interfaces/grid-lines.interface';
import { OptionsActionsInterface } from '../../interfaces/options-actions.interface';
import { OptionsTimesInterface } from '../../interfaces/options-times.interface';
import { Task } from '../../interfaces/task.interface';
import { TimesStepInterface } from '../../interfaces/times-step.interface';
import { ExecutionsGanttTaskChartElementComponent } from '../executions-gantt-task-chart-element/executions-gantt-task-chart-element.component';

@Component({
  selector: 'app-executions-gantt-task-chart-row',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ExecutionsGanttTaskChartElementComponent,
  ],
  templateUrl: './executions-gantt-task-chart-row.component.html',
  styleUrls: ['./executions-gantt-task-chart-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttTaskChartRowComponent implements OnDestroy {
  @Input() tasks!: Task[];
  @Input() times!: OptionsTimesInterface;
  @Input() options!: OptionsActionsInterface;
  /**
   * subject to unsubscribe
   */
  unsubscribe$ = new Subject<void>();

  get getHeight(): number {
    return 60;
  }

  get verticalLines(): GridLinesInterface[] {
    return this.times.steps.reduce(
      (aggr: GridLinesInterface[], step: TimesStepInterface) => {
        if (step.showLine) {
          const output = {
            key: `${step.time}`,
            x1: `${step.offset.px}`,
            y1: `${0}`,
            x2: `${step.offset.px}`,
            y2: `100%`,
            color: 'var(--jacaranda-400)',
          };
          return [...aggr, output];
        }

        return aggr;
      },
      [],
    );
  }

  get weekendDays(): TimesStepInterface[] {
    const isViewMonth: boolean = this.times.steps?.some(
      (item: TimesStepInterface) => !item.showLine,
    );
    return this.times.steps.filter(
      (item: TimesStepInterface) => isWeekend(item.time) && !isViewMonth,
    );
  }

  trackByFnTasks(index: number, task: Task): string {
    return `${task.id}`;
  }

  trackByFn(index: number, line: GridLinesInterface): string {
    return `${line.key}`;
  }

  trackByWeekendDayFn(index: number, item: TimesStepInterface): string {
    return `${item.time}`;
  }

  /**
   * Destroy: unsubscribe from subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
