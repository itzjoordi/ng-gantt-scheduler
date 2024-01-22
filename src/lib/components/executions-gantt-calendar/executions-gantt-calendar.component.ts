import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { addDays, addMonths, isWeekend, startOfMonth } from 'date-fns';
import { ExecutionsGanttCalendarDateCildrenInterface } from '../../interfaces/executions-gantt-calendar-date-cildren.interface';
import { ExecutionsGanttCalendarDateInterface } from '../../interfaces/executions-gantt-calendar-date.interface';
import { ExecutionsGanttCalendarDatesInterface } from '../../interfaces/executions-gantt-calendar-dates.interface';
import {
  ExecutionsGanttCalendarStateInterface,
  executionsGanttCalendarInitialState,
} from '../../interfaces/executions-gantt-calendar-state.interface';
import { OptionsCalendarInterface } from '../../interfaces/options-calendar.interface';
import { OptionsTimesInterface } from '../../interfaces/options-times.interface';
import { TimesStepInterface } from '../../interfaces/times-step.interface';
import { NgGanttSchedulerService } from '../../ng-gantt-scheduler.service';
import { ExecutionsGanttCalendarRowComponent } from '../executions-gantt-calendar-row/executions-gantt-calendar-row.component';

@Component({
  selector: 'app-executions-gantt-calendar',
  standalone: true,
  imports: [CommonModule, ExecutionsGanttCalendarRowComponent],
  templateUrl: './executions-gantt-calendar.component.html',
  styleUrls: ['./executions-gantt-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttCalendarComponent implements OnInit, OnChanges {
  @Input() times!: OptionsTimesInterface;
  @Input() calendar!: OptionsCalendarInterface;

  state!: ExecutionsGanttCalendarStateInterface;

  constructor(private executionsHelpersService: NgGanttSchedulerService) {}

  /**
   * handler changes
   */
  ngOnChanges(): void {
    if (this.state) {
      this.ngOnInit();
    }
  }
  /**
   * Initialization component
   */
  ngOnInit(): void {
    this.state = {
      ...executionsGanttCalendarInitialState,
      dates: this.getDates(this.times, this.calendar),
    };
  }

  private getDates(
    times: OptionsTimesInterface,
    calendar: OptionsCalendarInterface,
  ): ExecutionsGanttCalendarDatesInterface {
    const days: ExecutionsGanttCalendarDateInterface[] = this.generateDays(
      times,
      calendar,
    );
    const months: ExecutionsGanttCalendarDateInterface[] = this.generateMonths(
      times,
      calendar,
    );
    const years: ExecutionsGanttCalendarDateInterface[] = [];
    return { days, months, years };
  }

  private generateMonths(
    times: OptionsTimesInterface,
    calendar: OptionsCalendarInterface,
  ): ExecutionsGanttCalendarDateInterface[] {
    const months: ExecutionsGanttCalendarDateCildrenInterface[] = [];
    if (!calendar?.month?.display) {
      return [];
    }
    const monthsCount = this.executionsHelpersService.monthsCount(
      times?.firstTime,
      times?.lastTime,
    );
    if (monthsCount === 0) {
      return [];
    }
    let currentDate: number = times?.firstTime;
    for (let monthIndex = 0; monthIndex < monthsCount; monthIndex++) {
      let monthWidth: number = 0;
      let monthOffset: number = Number.MAX_SAFE_INTEGER;

      let finalDate: number = addDays(
        startOfMonth(addMonths(currentDate, 1)),
        -1,
      ).getTime();

      if (finalDate > times?.lastTime) {
        finalDate = times?.lastTime;
      }

      for (let step = 0, len = times?.steps?.length - 1; step <= len; step++) {
        const currentStep = times?.steps?.[step];
        monthOffset = this.executionsHelpersService.getMonthOffset(
          monthOffset,
          currentStep,
          currentDate,
          finalDate,
        );
        monthWidth = this.executionsHelpersService.getMonthWidth(
          monthWidth,
          currentStep,
          currentDate,
          finalDate,
        );
      }

      months.push({
        index: monthIndex,
        time: currentDate,
        key: `${monthIndex}m`,
        x: monthOffset,
        y: 0,
        width: monthWidth - 1,
        textWidth: 0,
        height: 0,
        label: `${currentDate}`,
      });

      currentDate = startOfMonth(addMonths(currentDate, 1)).getTime();
      if (currentDate > times?.lastTime) {
        currentDate = times?.lastTime;
      }
    }
    return months.map((item: ExecutionsGanttCalendarDateCildrenInterface) => ({
      key: item.key,
      children: [item],
    }));
  }

  private generateDays(
    times: OptionsTimesInterface,
    calendar: OptionsCalendarInterface,
  ): ExecutionsGanttCalendarDateInterface[] {
    let days: ExecutionsGanttCalendarDateCildrenInterface[] = [];
    if (!calendar?.day?.display) {
      return [];
    }
    const daysCount: number = this.howManyDaysFit(times);
    if (daysCount === 0) {
      return [];
    }
    const steps: TimesStepInterface[] = times?.steps;

    days = steps.map((item: TimesStepInterface, dayIndex: number) => ({
      index: dayIndex,
      time: item.time,
      key: item.time + 'd',
      x: item.offset.px || 0,
      y: 0,
      width: item.width?.px - 1,
      textWidth: 0,
      height: 0,
      label: new Date(item.time).getDate().toString(),
      isWeekend: isWeekend(item.time),
      isToday: this.isToday(item.time),
    }));

    return days.map((item) => ({
      key: item.key,
      children: [item],
    }));
  }

  private howManyDaysFit(times: OptionsTimesInterface): number {
    const stroke = 1;
    const additionalSpace = stroke + 2;
    const fullWidth = times?.width || 1;
    for (
      let days = times?.steps?.length;
      days > 1;
      days = Math.ceil(days / 2)
    ) {
      if (additionalSpace * days <= fullWidth && days > 1) {
        return days;
      }
    }
    return 0;
  }

  public isToday(time: number): boolean {
    //check if timestamp is today
    const today = new Date();
    const date = new Date(time);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
