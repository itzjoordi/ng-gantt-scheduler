import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { startOfDay } from 'date-fns';
import { GridLinesInterface } from '../../interfaces/grid-lines.interface';
import { OptionsActionsInterface } from '../../interfaces/options-actions.interface';
import { OptionsTimesInterface } from '../../interfaces/options-times.interface';
import { Task } from '../../interfaces/task.interface';
import { TimesStepInterface } from '../../interfaces/times-step.interface';
import { NgGanttSchedulerService } from '../../ng-gantt-scheduler.service';
import { ExecutionsGanttTaskChartGroupComponent } from '../executions-gantt-task-chart-group/executions-gantt-task-chart-group.component';
import { ExecutionsGanttTaskChartRowComponent } from '../executions-gantt-task-chart-row/executions-gantt-task-chart-row.component';

@Component({
  selector: 'app-executions-gantt-task-chart',
  standalone: true,
  imports: [
    CommonModule,
    ExecutionsGanttTaskChartRowComponent,
    ExecutionsGanttTaskChartGroupComponent,
  ],
  templateUrl: './executions-gantt-task-chart.component.html',
  styleUrls: ['./executions-gantt-task-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttTaskChartComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() tasks!: Task[];
  @Input() times!: OptionsTimesInterface;
  @Input() options!: OptionsActionsInterface;

  /**
   * subject to unsubscribe
   */
  unsubscribe$ = new Subject<void>();

  get line(): GridLinesInterface | null {
    const todayTime: number = startOfDay(new Date()).getTime();
    const stepToday: TimesStepInterface | undefined = this.times.steps.find(
      (step: TimesStepInterface) => step.time === todayTime,
    );
    if (!stepToday) {
      return null;
    }
    const pixelToCenter: number = stepToday.width.px / 2;
    return {
      key: `${stepToday.time}`,
      x1: `${stepToday.offset.px + pixelToCenter}`,
      y1: `${0}`,
      x2: `${stepToday.offset.px + pixelToCenter}`,
      y2: `100%`,
      color: 'var(--jacaranda-900)',
    };
  }

  get totalHeight(): number {
    return this.tasks.reduce((aggr: number, task: Task) => {
      if (task.collapsed === undefined || task.collapsed) {
        return aggr + 60;
      }
      if (!task.childs || task.childs?.length === 0) {
        return aggr + 60;
      }
      return aggr + task.childs?.length * 60 + 60;
    }, 0);
  }

  /**
   * Class constructor
   *
   *  @param ExecutionsHelpersService
   */

  constructor(
    private cd: ChangeDetectorRef,
    private executionsHelpersService: NgGanttSchedulerService,
  ) {}

  /**
   * handler changes
   */
  ngOnChanges(): void {
    this.cd.detectChanges();
  }

  /**
   * initialization: Gantt task chart
   */
  ngOnInit(): void {
    this.executionsHelpersService
      .getCollapsedTaskObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((task: Task) => {
        this.tasks = this.tasks.map((item: Task) => {
          if (item.id === task.id) {
            return { ...item, collapsed: task.collapsed ?? true };
          }
          return item;
        });
        this.cd.detectChanges();
      });
  }

  trackByFn(index: number, task: Task): string {
    return `${task.id}-${task.collapsed}`;
  }

  /**
   * Destroy: unsubscribe from subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
