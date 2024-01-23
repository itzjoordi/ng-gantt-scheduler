import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../../interfaces/task.interface';
import { NgGanttSchedulerService } from '../../ng-gantt-scheduler.service';
import { ExecutionsGanttTaskListItemComponent } from '../executions-gantt-task-list-item/executions-gantt-task-list-item.component';

@Component({
  selector: 'app-executions-gantt-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ExecutionsGanttTaskListItemComponent,
  ],
  templateUrl: './executions-gantt-task-list.component.html',
  styleUrls: ['./executions-gantt-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttTaskListComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() tasks!: Task[];
  @Input() yearSelected!: number;
  @Output() changeYearSelected: EventEmitter<number> =
    new EventEmitter<number>();

  /**
   * subject to unsubscribe
   */
  unsubscribe$ = new Subject<void>();

  /**
   * buttons loading
   */
  buttonsLoading: { previous: boolean; next: boolean } = {
    previous: false,
    next: false,
  };

  /**
   * Class constructor
   *
   *  @param ExecutionsHelpersService
   */

  constructor(
    private executionsHelpersService: NgGanttSchedulerService,
    private cd: ChangeDetectorRef,
  ) {}

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['yearSelected']) {
      setTimeout(() => {
        this.buttonsLoading = { previous: false, next: false };
        this.cd.detectChanges();
      }, 500);
    }
  }

  /**
   * initialization: Gantt task list
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
      });
  }

  trackByFn(index: number, task: Task): string {
    return `${task.id}`;
  }

  /**
   * emit change next year
   */
  nextYear(): void {
    this.buttonsLoading = { previous: false, next: true };
    setTimeout(() => {
      this.changeYearSelected.emit(this.yearSelected + 1);
      document.getElementById('scrollGantt')?.scrollTo({ left: 0 });
    }, 500);
  }

  /**
   * emit change previous year
   */
  previousYear(): void {
    this.buttonsLoading = { previous: true, next: false };
    setTimeout(() => {
      this.changeYearSelected.emit(this.yearSelected - 1);
      document
        .getElementById('11m')
        ?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
    }, 500);
  }

  /**
   * Destroy: unsubscribe from subscriptions
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
