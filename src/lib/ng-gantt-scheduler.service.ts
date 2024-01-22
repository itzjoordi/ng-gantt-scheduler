import { Injectable } from '@angular/core';
import { addDays, getMonth } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { OptionsTimesInterface } from './interfaces/options-times.interface';
import { Task } from './interfaces/task.interface';
import { TimesStepInterface } from './interfaces/times-step.interface';

@Injectable({
  providedIn: 'root',
})
export class NgGanttSchedulerService {
  /**
   * Subjet to emit if refresh data
   */
  private refeshDataTask$: Subject<boolean> = new Subject();

  /**
   * Subjet to emit if task collapsed
   */
  private collapsedTask$: Subject<Task> = new Subject();

  /**
   * Function to subcribe collapsed tasks
   *
   * @returns {Observable<Task>} an observale who holds the executions tasks
   */
  getCollapsedTaskObservable(): Observable<Task> {
    return this.collapsedTask$.asObservable();
  }

  /**
   * setter collapsed observable data
   *
   * @param {Task} task task
   */
  setCollapsedTaskObservable(task: Task): void {
    this.collapsedTask$.next(task);
  }

  /**
   * Function to subcribe refresh tasks data
   *
   * @returns {Observable<boolean>} boolean
   */
  getRefreshDataTaskObservable(): Observable<boolean> {
    return this.refeshDataTask$.asObservable();
  }

  /**
   * setter refresh tasks data
   */
  setRefreshDataTaskObservable(): void {
    this.refeshDataTask$.next(true);
  }

  /**
   * Functon count mounths
   *
   * @param {number} fromTime from
   * @param {number} toTime to
   * @returns {number} number
   */
  monthsCount(fromTime: number, toTime: number): number {
    if (fromTime > toTime) {
      return 0;
    }
    let currentMonth = fromTime;
    let previousMonth = fromTime;
    let monthsCount = 1;
    while (currentMonth < toTime) {
      currentMonth = addDays(currentMonth, 1).getTime();
      if (getMonth(previousMonth) !== getMonth(currentMonth)) {
        monthsCount++;
      }
      previousMonth = currentMonth;
    }
    return monthsCount;
  }

  /**
   * Funtion return offset month
   *
   * @param {number} monthOffset month
   * @param {number} step step
   * @param {number} firstTime time
   * @param {number} finalDate date
   * @returns {number} number
   */
  getMonthOffset(
    monthOffset: number,
    step: TimesStepInterface,
    firstTime: number,
    finalDate: number,
  ): number {
    if (
      step.time >= firstTime &&
      step.time < finalDate &&
      step.offset.px < monthOffset
    ) {
      return step.offset.px;
    }
    return monthOffset;
  }

  /**
   * Funtion return width month
   *
   * @param {number} monthWidth month
   * @param {number} step step
   * @param {number} firstTime time
   * @param {number} finalDate date
   * @returns {number} number
   */
  getMonthWidth(
    monthWidth: number,
    step: TimesStepInterface,
    firstTime: number,
    finalDate: number,
  ): number {
    if (step.time >= firstTime && step.time <= finalDate) {
      monthWidth += step.width.px;
    }
    return monthWidth;
  }

  getWidthSteps(
    startTime: number,
    endTime: number,
    times: OptionsTimesInterface,
  ): number {
    return times.steps.reduce((aggr: number, step: TimesStepInterface) => {
      if (step.time >= startTime && step.time < endTime) {
        return aggr + step.width.px;
      }
      return aggr;
    }, 0);
  }
}
