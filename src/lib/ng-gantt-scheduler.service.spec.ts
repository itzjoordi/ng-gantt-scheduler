import { TestBed } from '@angular/core/testing';

import { NgGanttSchedulerService } from './ng-gantt-scheduler.service';

describe('NgGanttSchedulerService', () => {
  let service: NgGanttSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgGanttSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
