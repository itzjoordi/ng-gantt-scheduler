import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../interfaces/task.interface';
import { NgGanttSchedulerService } from '../../ng-gantt-scheduler.service';

@Component({
  selector: 'app-executions-gantt-task-list-item',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './executions-gantt-task-list-item.component.html',
  styleUrls: ['./executions-gantt-task-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionsGanttTaskListItemComponent {
  @Input() task!: Task;

  @HostBinding('style.overflow') hostOverflowStyle = 'hidden';
  @HostBinding('style.width') hostWidthStyle = '100%';
  @HostBinding('style.height') hostHeight = '60px';

  @ViewChild('label', { static: false, read: ElementRef }) element!: ElementRef;

  tooltipDisabled: boolean = true;

  get isGroup(): boolean {
    return this.task.childs.length > 0;
  }

  constructor(private executionsHelpersService: NgGanttSchedulerService) {}

  /**
   * funtions to collapsed
   */
  onCollapsed(): void {
    if (this.task.collapsed === undefined) {
      this.task.collapsed = true;
    }
    this.task = { ...this.task, collapsed: !this.task.collapsed };
    this.executionsHelpersService.setCollapsedTaskObservable(this.task);
  }
}
