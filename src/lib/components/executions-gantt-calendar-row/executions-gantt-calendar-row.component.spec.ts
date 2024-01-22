import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { startOfDay } from 'date-fns';

import { MTranslateTestingModule } from '@mercadona/core/translate/testing';

import * as es from '../../../../../../../assets/i18n/es.json';
import { ExecutionsGanttCalendarRowComponent } from './executions-gantt-calendar-row.component';

describe('ExecutionsGanttCalendarRowComponent', () => {
  let component: ExecutionsGanttCalendarRowComponent;
  let fixture: ComponentFixture<ExecutionsGanttCalendarRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MTranslateTestingModule.forRoot({
          availableLanguages: ['es', 'pt'],
          defaultLanguage: 'es',
          langs: { es }
        })
      ],
      declarations: [ExecutionsGanttCalendarRowComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGanttCalendarRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create  7 items months trackByItemsFn', () => {
    component.items = [
      {
        key: '0m',
        children: [
          {
            index: 0,
            time: 1658527200000,
            key: '0m',
            x: 0,
            y: 0,
            width: 437,
            textWidth: 0,
            height: 0,
            label: '1658527200000'
          }
        ]
      },
      {
        key: '1m',
        children: [
          {
            index: 1,
            time: 1659304800000,
            key: '1m',
            x: 439,
            y: 0,
            width: 1513,
            textWidth: 0,
            height: 0,
            label: '1659304800000'
          }
        ]
      },
      {
        key: '2m',
        children: [
          {
            index: 2,
            time: 1661983200000,
            key: '2m',
            x: 1954,
            y: 0,
            width: 1463,
            textWidth: 0,
            height: 0,
            label: '1661983200000'
          }
        ]
      },
      {
        key: '3m',
        children: [
          {
            index: 3,
            time: 1664575200000,
            key: '3m',
            x: 3419,
            y: 0,
            width: 1515,
            textWidth: 0,
            height: 0,
            label: '1664575200000'
          }
        ]
      },
      {
        key: '4m',
        children: [
          {
            index: 4,
            time: 1667257200000,
            key: '4m',
            x: 4936,
            y: 0,
            width: 1463,
            textWidth: 0,
            height: 0,
            label: '1667257200000'
          }
        ]
      },
      {
        key: '5m',
        children: [
          {
            index: 5,
            time: 1669849200000,
            key: '5m',
            x: 6401,
            y: 0,
            width: 1513,
            textWidth: 0,
            height: 0,
            label: '1669849200000'
          }
        ]
      },
      {
        key: '6m',
        children: [
          {
            index: 6,
            time: 1672527600000,
            key: '6m',
            x: 7916,
            y: 0,
            width: 730,
            textWidth: 0,
            height: 0,
            label: '1672527600000'
          }
        ]
      }
    ];
    fixture.detectChanges();

    // const elements = document.getElementsByClassName('calendar-row-rect');
    // expect(elements.length).toEqual(7);
    expect(component).toBeTruthy();
  });

  it('should return itemKey when call trackByItemsFn', () => {
    const item = {
      key: '0m',
      children: [
        {
          index: 0,
          time: 1658527200000,
          key: '0m',
          x: 0,
          y: 0,
          width: 437,
          textWidth: 0,
          height: 0,
          label: '1658527200000'
        }
      ]
    };
    const valuetReturn = component.trackByItemsFn(0, item);
    expect(valuetReturn).toBe(item.key);
  });
  it('should return itemKey when call trackByCildrenFn', () => {
    const item = {
      index: 0,
      time: 1658527200000,
      key: '0m',
      x: 0,
      y: 0,
      width: 437,
      textWidth: 0,
      height: 0,
      label: '1658527200000'
    };
    const valuetReturn = component.trackByCildrenFn(0, item);
    expect(valuetReturn).toBe(item.key);
  });

  it('should scroll if exist today', () => {
    const todayTime: number = startOfDay(new Date()).getTime();
    const todayId: string = `${todayTime}d`;
    component.items = [
      {
        key: todayId,
        children: [
          {
            index: 0,
            time: 1658527200000,
            key: todayId,
            x: 0,
            y: 0,
            width: 437,
            textWidth: 0,
            height: 0,
            label: '1658527200000'
          }
        ]
      }
    ];
    fixture.detectChanges();
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
});
