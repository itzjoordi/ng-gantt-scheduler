import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { addDays, startOfDay, subDays } from 'date-fns';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { OptionsActionsInterface } from '../../interfaces/options-actions.interface';
import { OptionsTimesInterface } from '../../interfaces/options-times.interface';
import { Task } from '../../interfaces/task.interface';
import { TimesStepInterface } from '../../interfaces/times-step.interface';
import { NgGanttSchedulerService } from '../../ng-gantt-scheduler.service';

@Component({
  selector: 'app-executions-gantt-task-chart-element',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './executions-gantt-task-chart-element.component.html',
  styleUrls: ['./executions-gantt-task-chart-element.component.scss'],
})
export class ExecutionsGanttTaskChartElementComponent implements OnDestroy {
  @Input() task!: Task;
  @Input() times!: OptionsTimesInterface;
  @Input() options!: OptionsActionsInterface;
  /**
   * subject to unsubscribe
   */
  unsubscribe$ = new Subject<void>();

  get tooltipDisabled(): boolean {
    return true;
  }

  get showActions(): boolean {
    return this.canDelete || this.canEdit;
  }

  get getHeight(): number {
    if (this.task.childs.length > 0) {
      return this.task.collapsed ? 60 : 60 * this.task.childs.length;
    }
    return 60;
  }

  get getX(): string {
    const startTime: number = startOfDay(this.task.startTime).getTime();
    const step = this.times.steps.find(
      (item: TimesStepInterface) => item.time === startTime,
    );
    return `${step?.offset.px ?? 0}`;
  }

  get getWidth(): string {
    const startTime: number = startOfDay(this.task.startTime).getTime();
    const endTime: number = startOfDay(addDays(this.task.endTime, 1)).getTime();
    const width = this.getWidthSteps(startTime, endTime);
    return `${width}`;
  }

  get tooltipSteps(): number[] {
    const startTime: number = startOfDay(this.task.startTime).getTime();
    const endTime: number = startOfDay(addDays(this.task.endTime, 1)).getTime();
    const width = this.getWidthSteps(startTime, endTime);
    const n = Math.trunc(width / 46);
    return new Array(n).fill(null).map((_, i) => i + 1);
  }

  get getOffsetPrevX(): string {
    const startTime: number = startOfDay(
      subDays(this.task.startTime, this.task.offsetPre ?? 0),
    ).getTime();
    const step = this.times.steps.find(
      (item: TimesStepInterface) => item.time === startTime,
    );
    return `${step?.offset?.px ?? 0}`;
  }

  get showBorderLeft(): boolean {
    const startTime: number = startOfDay(
      subDays(this.task.startTime, this.task.offsetPre ?? 0),
    ).getTime();
    const step = this.times.steps?.some(
      (item: TimesStepInterface) => item.time === startTime,
    );
    return step;
  }

  get showBorderLeftMaster(): boolean {
    const offsetPre: boolean = this.task.offsetPre === 0;
    return offsetPre;
  }

  get showBorderRight(): boolean {
    const startTime: number = startOfDay(
      addDays(this.task.endTime, 1),
    ).getTime();
    const step = this.times.steps?.some(
      (item: TimesStepInterface) => item.time === startTime,
    );
    return step;
  }

  get showBorderRightMaster(): boolean {
    const offsetPost: boolean = this.task.offsetPost === 0;
    return offsetPost;
  }

  get getWidthOffsetPre(): string {
    const startTime: number = startOfDay(
      addDays(this.task.startTime, -(this.task.offsetPre ?? 0)),
    ).getTime();
    const endTime: number = startOfDay(this.task.startTime).getTime();

    const width = this.times.steps.reduce(
      (aggr: number, step: TimesStepInterface) => {
        if (step.time > startTime && step.time <= endTime) {
          return aggr + step.width.px;
        }
        return aggr;
      },
      0,
    );

    return `${width}`;
  }

  get getOffsetPostX(): string {
    const startTime: number = startOfDay(
      addDays(this.task.endTime, 1),
    ).getTime();
    const step = this.times.steps.find(
      (item: TimesStepInterface) => item.time === startTime,
    );
    return `${step?.offset?.px ?? 0}`;
  }

  get getWidthOffsetPost(): string {
    const startTime: number = startOfDay(
      addDays(this.task.endTime, 1),
    ).getTime();
    const endTime: number = startOfDay(
      addDays(this.task.endTime, this.task.offsetPost ?? 0 + 1),
    ).getTime();
    const width = this.getWidthSteps(startTime, endTime);
    return `${width}`;
  }

  get canEdit(): boolean {
    return this.options.update;
  }

  get canDelete(): boolean {
    return this.options.delete;
  }

  constructor(private executionsHelpersService: NgGanttSchedulerService) {}

  /**
   * Hanler open dialog to update task
   */
  openEditDialog(): void {
    //TODO: Launch event to open dialog
  }

  /**
   * Open delete confirm dialog
   */
  openDeleteConfirmDialog() {
    //TODO: Launch event to open dialog
  }

  private getWidthSteps(startTime: number, endTime: number): number {
    return this.executionsHelpersService.getWidthSteps(
      startTime,
      endTime,
      this.times,
    );
  }

  trackByFn(index: number, stepTooltip: number): string {
    return `${stepTooltip}`;
  }

  /**
   * Destroy: unsubscribe from subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
