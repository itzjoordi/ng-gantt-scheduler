import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLinesInterface } from '@pages/executions/interfaces/grid-lines.interface';
import { TimesStepInterface } from '@pages/executions/interfaces/times-step.interface';
import { DialogHelperService } from '@services/dialog-helper.service';
import * as es from 'assets/i18n/es.json';
import { of } from 'rxjs/internal/observable/of';

import { MDialogModule } from '@mercadona/components/dialog';
import { MSnackbarModule, MSnackbarService } from '@mercadona/components/snackbar';
import { MTooltipModule } from '@mercadona/components/tooltip';
import { MLoggerTestingModule } from '@mercadona/core/logger/testing';
import { MTranslateTestingModule } from '@mercadona/core/translate/testing';

import { ExecutionsGanttTaskChartRowComponent } from './executions-gantt-task-chart-row.component';

class MSnackBarTest {
  create() {
    return {
      onAction: () => of({}),
      afterDismissed: () => of({}),
      close: () => of({})
    };
  }
}

describe('ExecutionsGanttTaskChartRowComponent', () => {
  let component: ExecutionsGanttTaskChartRowComponent;
  let fixture: ComponentFixture<ExecutionsGanttTaskChartRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MTooltipModule,
        MTranslateTestingModule.forRoot({
          availableLanguages: ['es'],
          defaultLanguage: 'es',
          langs: { es }
        }),
        HttpClientTestingModule,
        MSnackbarModule,
        MLoggerTestingModule,
        MDialogModule
      ],
      declarations: [ExecutionsGanttTaskChartRowComponent],
      providers: [DialogHelperService, { provide: MSnackbarService, useClass: MSnackBarTest }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGanttTaskChartRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: false, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        {
          time: 1673737200000,
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        }
      ]
    };
    component.tasks = [
      {
        id: '4432',
        internalId: '4432',
        label: 'Teatinos (Málaga)',
        startTime: 1658527200000,
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
    expect(component).toBeTruthy();
  });

  it('should return 2 days weekend days if isViewMonth', () => {
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        {
          time: new Date(2022, 10, 11).getTime(),
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        },
        {
          time: new Date(2022, 10, 12).getTime(),
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        },
        {
          time: new Date(2022, 10, 13).getTime(),
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        }
      ]
    };
    fixture.detectChanges();
    expect(component.weekendDays.length).toEqual(2);
  });

  it('should return lineKey when call trackByFn', () => {
    const item: GridLinesInterface = { key: '11a', x1: '0', y1: '0', x2: '0', y2: '0', color: '' };
    const returnTrack: string = component.trackByFn(0, item);
    expect(returnTrack).toEqual('11a');
  });

  it('should return itemTime when call trackByWeekendDayFn', () => {
    const item: TimesStepInterface = {
      time: 1668121200000,
      showLine: true,
      offset: { ms: 15210000000, px: 8600 },
      width: { ms: 1658613600000, px: 48 }
    };
    const returnTrack: string = component.trackByWeekendDayFn(0, item);
    expect(returnTrack).toEqual('1668121200000');
  });

  it('should return vertical lines when to call verticalLines and exist some showLine', () => {
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: false, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        {
          time: 1673737200000,
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        }
      ]
    };
    fixture.detectChanges();
    const lengthLines: number = component.verticalLines.length;
    expect(lengthLines).toEqual(1);
  });
});
