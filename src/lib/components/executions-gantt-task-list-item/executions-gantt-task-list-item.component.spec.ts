import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ExecutionsHelpersService } from '@pages/executions/services/executions-helpers.service';
import * as es from 'assets/i18n/es.json';

import { MTooltipModule } from '@mercadona/components/tooltip';
import { MLoggerTestingModule } from '@mercadona/core/logger/testing';
import { MTranslateTestingModule } from '@mercadona/core/translate/testing';

import { ExecutionsGanttTaskListItemComponent } from './executions-gantt-task-list-item.component';

describe('ExecutionsGanttTaskListItemComponent', () => {
  let component: ExecutionsGanttTaskListItemComponent;
  let fixture: ComponentFixture<ExecutionsGanttTaskListItemComponent>;
  let executionsHelpersService: ExecutionsHelpersService;
  let router: Router;
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const mockElementRef: ElementRef = {
    nativeElement: {
      scrollWidth: 200,
      clientWidth: 100
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MTooltipModule,
        HttpClientTestingModule,
        MLoggerTestingModule,
        MTranslateTestingModule.forRoot({
          availableLanguages: ['es'],
          defaultLanguage: 'es',
          langs: { es }
        })
      ],
      declarations: [ExecutionsGanttTaskListItemComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: routerSpy, url: 'user-profile/7' }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGanttTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    executionsHelpersService = TestBed.inject(ExecutionsHelpersService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should view tooltip if text elipsis', () => {
    component.task = {
      id: '4432',
      internalId: '4432',
      label: 'Villarubia de los Olivos',
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
    component.element = mockElementRef;
    fixture.detectChanges();
    component.ngAfterViewInit();
    const value: boolean = component.getTooltipDisabledValue(mockElementRef);
    expect(value).toBe(true);
    expect(component).toBeTruthy();
  });

  it('should call setCollapsedTaskObservable when collapsed', () => {
    const spy = spyOn(executionsHelpersService, 'setCollapsedTaskObservable');
    component.task = {
      id: '4432',
      internalId: '4432',
      label: 'Villarubia de los Olivos',
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
    fixture.detectChanges();
    component.onCollapsed();
    expect(component.task.collapsed).toEqual(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to user-profice when click user', () => {
    spyOn(router, 'navigate').and.callFake(
      () =>
        new Promise((resolveOuter) => {
          resolveOuter(
            new Promise((resolveInner) => {
              setTimeout(resolveInner, 1000);
            })
          );
        })
    );
    component.task = {
      id: '4432',
      internalId: '4432',
      label: 'Villarubia de los Olivos',
      startTime: 1662563275884,
      endTime: 1668034800000,
      offsetPre: 45,
      offsetPost: 30,
      type: { id: '2', typeName: 'Aperturas-Reformas' },
      asignedTo: {
        id: 7,
        name: 'Marta',
        firstSurname: 'Álvarez',
        secondSurname: '',
        fullName: 'Marta Álvarez',
        userId: 'U7'
      },
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
    fixture.detectChanges();
    component.onUserClick();
    fixture.whenStable().then(() => {
      expect(router.url).toEqual('user-profile/7');
    });
  });

  it('should not navigate to user-profice when click user', () => {
    spyOn(router, 'navigate').and.callFake(
      () =>
        new Promise((resolveOuter) => {
          resolveOuter(
            new Promise((resolveInner) => {
              setTimeout(resolveInner, 1000);
            })
          );
        })
    );
    component.task = {
      id: '4432',
      internalId: '4432',
      label: 'Villarubia de los Olivos',
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
    fixture.detectChanges();
    component.onUserClick();
    fixture.whenStable().then(() => {
      expect(router.url).toEqual('user-profile/7');
    });
  });
});
