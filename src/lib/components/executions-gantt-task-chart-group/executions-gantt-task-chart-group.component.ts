import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { addDays, startOfDay, subDays } from 'date-fns';
import { OptionsActionsInterface } from '../../interfaces/options-actions.interface';
import { OptionsTimesInterface } from '../../interfaces/options-times.interface';
import { Task } from '../../interfaces/task.interface';
import { ExecutionsGanttTaskChartRowComponent } from '../executions-gantt-task-chart-row/executions-gantt-task-chart-row.component';

@Component({
  selector: 'app-executions-gantt-task-chart-group',
  standalone: true,
  imports: [CommonModule, ExecutionsGanttTaskChartRowComponent],
  templateUrl: './executions-gantt-task-chart-group.component.html',
  styleUrls: ['./executions-gantt-task-chart-group.component.scss'],
})
export class ExecutionsGanttTaskChartGroupComponent {
  @Input() task!: Task;
  @Input() times!: OptionsTimesInterface;
  @Input() options!: OptionsActionsInterface;

  get optionsMain(): OptionsActionsInterface {
    return {
      update: false,
      delete: false,
    };
  }

  get height(): number {
    return this.task.collapsed ? 60 : 60 * this.task.childs?.length + 60;
  }

  get heightChilds(): number {
    const value = this.task.childs?.length;
    return value * 60;
  }

  get mainTasks(): Task[] {
    return [...this.task.childs];
  }

  trackByFn(index: number, task: Task): string {
    return `${task.id}`;
  }

  getOverlaps(): Task[] {
    const childs: Task[] = this.task.childs.sort(
      (a: Task, b: Task) =>
        startOfDay(subDays(a.startTime, a.offsetPre ?? 0)).getTime() -
        startOfDay(subDays(b.startTime, b.offsetPre ?? 0)).getTime(),
    );
    const taskOverlaps: Task[] = childs.reduce(
      (aggr: Task[], item: Task, index: number) => {
        const endTimeitem: Date = startOfDay(
          addDays(item.endTime, item.offsetPost ?? 0),
        );
        const overlapsFilter = childs
          .filter(
            (chd: Task, indexFilter: number) =>
              chd.id !== item.id && indexFilter > index,
          )
          .filter(
            (chd: Task) =>
              startOfDay(
                subDays(chd.startTime, chd.offsetPre ?? 0),
              ).getTime() <= endTimeitem.getTime(),
          );
        return overlapsFilter.reduce((aggrO: Task[], itemO: Task) => {
          const endTimeitemO = startOfDay(
            addDays(itemO.endTime, itemO.offsetPost ?? 0),
          );
          const newOverlap = {
            ...itemO,
            type: {
              id: this.getColorOverlap(itemO.color ?? '', item.color ?? ''),
              name: '',
            },
            startTime: startOfDay(
              subDays(itemO.startTime, itemO.offsetPre ?? 0),
            ),
            endTime: endTimeitemO <= endTimeitem ? endTimeitemO : endTimeitem,
            text: '',
            offsetPre: 0,
            offsetPost: 0,
          };
          return [...aggrO, newOverlap];
        }, aggr);
      },
      [],
    );

    return [...taskOverlaps];
  }

  getColorOverlap(color1: string, color2: string): string {
    //Transform to RGB
    const color1Rgb = this.hexToRgb(color1);
    const color2Rgb = this.hexToRgb(color2);

    //Mixing colors
    const newColorRgb = {
      r: Math.round((color1Rgb.r + color2Rgb.r) / 2),
      g: Math.round((color1Rgb.g + color2Rgb.g) / 2),
      b: Math.round((color1Rgb.b + color2Rgb.b) / 2),
    };
    return this.rgbToHex(newColorRgb);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  private rgbToHex(rgb: { r: number; g: number; b: number }): string {
    const { r, g, b } = rgb;
    const rgbHex = (r << 16) | (g << 8) | b;
    const hex = (0x1000000 | rgbHex).toString(16).substring(1);
    return `#${hex}`;
  }
}
