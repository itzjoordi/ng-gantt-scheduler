import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  addDays,
  differenceInMilliseconds,
  getYear,
  isFirstDayOfMonth,
  lastDayOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { ExecutionsGanttCalendarComponent } from './components/executions-gantt-calendar/executions-gantt-calendar.component';
import { ExecutionsGanttTaskChartComponent } from './components/executions-gantt-task-chart/executions-gantt-task-chart.component';
import { ExecutionsGanttTaskListComponent } from './components/executions-gantt-task-list/executions-gantt-task-list.component';
import {
  GanttState,
  ViewMode,
  ganttInitialState,
} from './interfaces/gantt-state.interface';
import { OptionsTimesInterface } from './interfaces/options-times.interface';
import { Task } from './interfaces/task.interface';
import { TimesStepInterface } from './interfaces/times-step.interface';
@Component({
  selector: 'ng-gantt-scheduler',
  standalone: true,
  imports: [
    CommonModule,
    ExecutionsGanttTaskListComponent,
    ExecutionsGanttCalendarComponent,
    ExecutionsGanttTaskChartComponent,
    MatProgressSpinner,
  ],
  templateUrl: './ng-gantt-scheduler.component.html',
  styleUrl: './ng-gantt-scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgGanttSchedulerComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() viewMode: ViewMode = 'day';

  state!: GanttState;

  /**
   * Initialization component
   */
  ngOnInit(): void {
    this.state = {
      ...ganttInitialState,
      viewMode: this.viewMode,
      tasks: this.tasks,
      yearSelected: this.getYearSelected(),
      options: {
        ...ganttInitialState.options,
        update: true,
        delete: true,
      },
    };
    this.initialization();
  }

  /**
   * handler changes
   */
  ngOnChanges(): void {
    if (this.state) {
      this.state = {
        ...this.state,
        tasks: this.tasks,
        viewMode: this.viewMode,
      };
      this.initialization();
    }
  }

  getYearSelected(): number {
    return getYear(new Date());
  }

  onChangeYearSelected(yearSelected: number): void {
    localStorage.setItem('yearConfig', yearSelected.toString());
    this.state = { ...this.state, yearSelected };
    this.initialization();
  }

  /**
   * initialization values with new values of tasks
   */
  private initialization(): void {
    this.initTimes();
    this.recalculateTimes();
    this.calculateSteps(this.state.times);
    this.handlerVisibilityCalendarRows();
  }
  /**
   * initialization values of times
   */
  private initTimes(): void {
    let firstTaskTime =
      this.state.tasks?.length > 0 ? Number.MAX_SAFE_INTEGER : 0;
    let lastTaskTime = 0;
    let firstTime: number =
      this.state.tasks?.length > 0 ? Number.MAX_SAFE_INTEGER : 0;
    let lastTime: number = 0;
    for (let index = 0, len = this.state.tasks?.length; index < len; index++) {
      const task = this.state.tasks[index];

      const startTime: number = startOfDay(new Date(task.startTime)).getTime();
      const endTime: number = startOfDay(new Date(task.endTime)).getTime();
      if (startTime < firstTaskTime) {
        firstTaskTime = startOfDay(task.startTime).getTime();
      }
      if (endTime > lastTaskTime) {
        lastTaskTime = startOfDay(task.endTime).getTime();
      }
    }
    const optionsScopeBefore: number = 2;
    const optionsScopeAfter: number = 2;
    // apply limit times
    const startLimitTime: number = startOfDay(
      new Date(this.state.yearSelected, 0, 1),
    ).getTime();
    const endLimitTime: number = startOfDay(
      new Date(this.state.yearSelected, 11, 31),
    ).getTime();
    firstTime = this.state.useLimit
      ? startLimitTime
      : startOfMonth(
          subDays(startOfDay(firstTime), optionsScopeBefore),
        ).getTime();
    lastTime = this.state.useLimit
      ? endLimitTime
      : lastDayOfMonth(
          addDays(startOfDay(lastTime), optionsScopeAfter),
        ).getTime();
    this.state = {
      ...this.state,
      times: {
        ...this.state.times,
        firstTaskTime,
        firstTime,
        lastTaskTime,
        lastTime,
      },
    };
  }
  /**
   * recalculate time per pixel and width
   */
  private recalculateTimes(): void {
    const timeScale: number = 60 * 1000;
    const timeZoom: number = this.state.viewMode === 'day' ? 20 : 24;
    const lastTime: number = addDays(this.state.times?.lastTime, 1).getTime();
    const firstTime: number = this.state.times?.firstTime;
    const max = timeScale * 60;
    const min = timeScale;
    const steps = max / min;
    const percent = timeZoom / 100;
    const timePerPixel: number = Math.trunc(
      timeScale * steps * percent + Math.pow(2, timeZoom),
    );
    const totalViewDurationMs: number = differenceInMilliseconds(
      lastTime,
      firstTime,
    );
    const width: number = Math.trunc(totalViewDurationMs / timePerPixel);
    this.state = {
      ...this.state,
      times: { ...this.state.times, timePerPixel, width },
    };
  }

  private calculateSteps(times: OptionsTimesInterface): void {
    let steps: TimesStepInterface[] = [] as TimesStepInterface[];
    const lastMs: number = times?.lastTime;
    const timePerPixel: number = times?.timePerPixel;
    steps.push({
      time: times.firstTime,
      showLine:
        this.state.viewMode === 'month'
          ? isFirstDayOfMonth(times.firstTime)
          : true,
      offset: { ms: 0, px: 0 },
      width: { ms: 0, px: 0 },
    });
    for (
      let currentDate = startOfDay(addDays(times.firstTime, 1));
      currentDate.getTime() <= lastMs;
      currentDate = startOfDay(addDays(currentDate, 1))
    ) {
      const offsetMs: number = differenceInMilliseconds(
        currentDate,
        times.firstTime,
      );
      const offsetPx = Math.trunc(offsetMs / timePerPixel);
      const step: TimesStepInterface = {
        time: currentDate.getTime(),
        showLine:
          this.state.viewMode === 'month'
            ? isFirstDayOfMonth(currentDate.getTime())
            : true,
        offset: { ms: offsetMs, px: offsetPx },
        width: { ms: 0, px: 0 },
      };
      const lastStep: TimesStepInterface = steps[steps.length - 1];
      steps[steps.length - 1].width = {
        ms: offsetMs - lastStep.offset.ms,
        px: offsetPx - lastStep.offset.px,
      };
      // add new
      steps.push(step);
    }

    steps = steps.map((item: TimesStepInterface, index: number) => {
      if (index === steps.length - 1) {
        return {
          ...item,
          width: {
            ms: times.lastTime - item.offset.ms,
            px: times.width - item.offset.px,
          },
        };
      }
      return item;
    });
    this.state = { ...this.state, times: { ...this.state.times, steps } };
  }

  /**
   * handler visibilite calendar rows
   */
  private handlerVisibilityCalendarRows(): void {
    const isViewModeDay: boolean = this.state.viewMode === 'day';
    this.state = {
      ...this.state,
      calendar: {
        ...this.state.calendar,
        day: { ...this.state.calendar.day, display: isViewModeDay },
        month: { ...this.state.calendar.month, display: true },
        year: { ...this.state.calendar.year, display: !isViewModeDay },
      },
    };
  }
}
