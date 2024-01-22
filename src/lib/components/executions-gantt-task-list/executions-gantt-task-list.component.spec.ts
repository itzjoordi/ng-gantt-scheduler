import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ExecutionTaskGanttInterface } from '@pages/executions/interfaces/execution-task-gantt.interface';
import { ExecutionsHelpersService } from '@pages/executions/services/executions-helpers.service';
import * as es from 'assets/i18n/es.json';

import { MLoggerTestingModule } from '@mercadona/core/logger/testing';
import { MTranslateTestingModule } from '@mercadona/core/translate/testing';

import { ExecutionsGanttTaskListComponent } from './executions-gantt-task-list.component';

describe('ExecutionsGanttTaskListComponent', () => {
  let component: ExecutionsGanttTaskListComponent;
  let fixture: ComponentFixture<ExecutionsGanttTaskListComponent>;
  let executionsHelpersService: ExecutionsHelpersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutionsGanttTaskListComponent],
      imports: [
        HttpClientTestingModule,
        MLoggerTestingModule,
        MTranslateTestingModule.forRoot({
          availableLanguages: ['es'],
          defaultLanguage: 'es',
          langs: { es }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGanttTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    executionsHelpersService = TestBed.inject(ExecutionsHelpersService);
  });

  it('should create', () => {
    const changes: SimpleChanges = {
      yearSelected: { previousValue: 2022, currentValue: 2023, firstChange: false, isFirstChange: () => false }
    };
    component.ngOnChanges(changes);
    expect(component).toBeTruthy();
  });

  it('should correct onchange', () => {
    const changes: SimpleChanges = {
      tasks: { previousValue: [], currentValue: [], firstChange: false, isFirstChange: () => false }
    };
    component.ngOnChanges(changes);
    expect(component).toBeTruthy();
  });

  it('should onchange settimeout', fakeAsync(async () => {
    const changes: SimpleChanges = {
      yearSelected: { previousValue: 2022, currentValue: 2023, firstChange: false, isFirstChange: () => false }
    };
    component.ngOnChanges(changes);
    tick(1000);
    fixture.detectChanges();

    expect(component.buttonsLoading).toEqual({ previous: false, next: false });
  }));

  it('should sub year when click next button', fakeAsync(async () => {
    const spy = spyOn(component.changeYearSelected, 'emit').and.callThrough();
    component.yearSelected = 2022;
    component.nextYear();
    tick(1000);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should sub year when click previous button', fakeAsync(async () => {
    const spy = spyOn(component.changeYearSelected, 'emit').and.callThrough();
    component.yearSelected = 2022;
    component.previousYear();
    tick(1000);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should call trackBy and return taskId', () => {
    const task: ExecutionTaskGanttInterface = {
      id: '4432',
      internalId: '4432',
      label: 'Teatinos (Málaga)',
      startTime: 1662563275884,
      endTime: 1668034800000,
      offsetPre: 45,
      offsetPost: 30,
      type: { id: '2', typeName: 'Aperturas-Reformas' },
      asignedTo: null,
      typeModel: '',
      center: { publicId: '2064', zoneId: 1 },
      collapsed: true,
      text: '',
      massiveId: null,
      closedTime: null,
      binomioAsignedTo: null,
      temporalAsignedTo: null,

      childs: []
    };
    const resultTrackBy = component.trackByFn(0, task);
    expect(resultTrackBy).toBe('4432');
  });

  it('should subscribe collapsed', () => {
    component.tasks = [
      {
        id: '4432',
        internalId: '4432',
        label: 'Teatinos (Málaga)',
        startTime: 1662563275884,
        endTime: 1668034800000,
        offsetPre: 45,
        offsetPost: 30,
        type: { id: '2', typeName: 'Aperturas-Reformas' },
        asignedTo: null,
        typeModel: '',
        center: { publicId: '2064', zoneId: 1 },
        collapsed: true,
        text: '',
        massiveId: null,
        closedTime: null,
        binomioAsignedTo: null,
        temporalAsignedTo: null,

        childs: []
      },
      {
        id: '4430',
        internalId: '4432',
        label: 'Teatinos (Málaga)',
        startTime: 1662563275884,
        endTime: 1668034800000,
        offsetPre: 45,
        offsetPost: 30,
        type: { id: '2', typeName: 'Aperturas-Reformas' },
        asignedTo: null,
        typeModel: '',
        center: { publicId: '2064', zoneId: 1 },
        collapsed: true,
        text: '',
        massiveId: null,
        closedTime: null,
        binomioAsignedTo: null,
        temporalAsignedTo: null,

        childs: []
      }
    ];
    fixture.detectChanges();
    component.ngOnInit();
    executionsHelpersService.setCollapsedTaskObservable({
      id: '4432',
      internalId: '4432',
      label: 'Teatinos (Málaga)',
      startTime: 1662563275884,
      endTime: 1668034800000,
      offsetPre: 45,
      offsetPost: 30,
      type: { id: '2', typeName: 'Aperturas-Reformas' },
      asignedTo: null,
      typeModel: '',
      center: { publicId: '2064', zoneId: 1 },
      collapsed: false,
      text: '',
      massiveId: null,
      closedTime: null,
      binomioAsignedTo: null,
      temporalAsignedTo: null,

      childs: []
    });
    expect(component.tasks[0].collapsed).toEqual(false);
  });
});
