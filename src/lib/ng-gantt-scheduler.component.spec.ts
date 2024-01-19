import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGanttSchedulerComponent } from './ng-gantt-scheduler.component';

describe('NgGanttSchedulerComponent', () => {
  let component: NgGanttSchedulerComponent;
  let fixture: ComponentFixture<NgGanttSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgGanttSchedulerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgGanttSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
