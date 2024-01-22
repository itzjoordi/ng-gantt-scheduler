import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTaskGanttInterface } from '@pages/executions/interfaces/execution-task-gantt.interface';
import { GridLinesInterface } from '@pages/executions/interfaces/grid-lines.interface';
import { ExecutionsHelpersService } from '@pages/executions/services/executions-helpers.service';
import * as es from 'assets/i18n/es.json';
import { startOfDay } from 'date-fns';

import { MDialogModule } from '@mercadona/components/dialog';
import { MSnackbarModule } from '@mercadona/components/snackbar';
import { MTooltipModule } from '@mercadona/components/tooltip';
import { MLoggerTestingModule } from '@mercadona/core/logger/testing';
import { MTranslateTestingModule } from '@mercadona/core/translate/testing';

import { ExecutionsGanttTaskChartGroupComponent } from '../executions-gantt-task-chart-group/executions-gantt-task-chart-group.component';
import { ExecutionsGanttTaskChartRowComponent } from '../executions-gantt-task-chart-row/executions-gantt-task-chart-row.component';
import { ExecutionsGanttTaskChartComponent } from './executions-gantt-task-chart.component';

describe('ExecutionsGanttTaskChartComponent', () => {
  let component: ExecutionsGanttTaskChartComponent;
  let fixture: ComponentFixture<ExecutionsGanttTaskChartComponent>;
  let executionsHelpersService: ExecutionsHelpersService;

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
      declarations: [
        ExecutionsGanttTaskChartComponent,
        ExecutionsGanttTaskChartRowComponent,
        ExecutionsGanttTaskChartGroupComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsGanttTaskChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    executionsHelpersService = TestBed.inject(ExecutionsHelpersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should 1 tasks', () => {
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
      }
    ];
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: true, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        { time: 1658613600000, showLine: true, offset: { ms: 86400000, px: 48 }, width: { ms: 86400000, px: 49 } },
        { time: 1658700000000, showLine: true, offset: { ms: 172800000, px: 97 }, width: { ms: 86400000, px: 49 } },
        { time: 1658786400000, showLine: true, offset: { ms: 259200000, px: 146 }, width: { ms: 86400000, px: 49 } },
        { time: 1658872800000, showLine: true, offset: { ms: 345600000, px: 195 }, width: { ms: 86400000, px: 49 } },
        { time: 1658959200000, showLine: true, offset: { ms: 432000000, px: 244 }, width: { ms: 86400000, px: 49 } },
        { time: 1659045600000, showLine: true, offset: { ms: 518400000, px: 293 }, width: { ms: 86400000, px: 48 } },
        { time: 1659132000000, showLine: true, offset: { ms: 604800000, px: 341 }, width: { ms: 86400000, px: 49 } },
        { time: 1659218400000, showLine: true, offset: { ms: 691200000, px: 390 }, width: { ms: 86400000, px: 49 } },
        { time: 1659304800000, showLine: true, offset: { ms: 777600000, px: 439 }, width: { ms: 86400000, px: 49 } },
        { time: 1659391200000, showLine: true, offset: { ms: 864000000, px: 488 }, width: { ms: 86400000, px: 49 } },
        { time: 1659477600000, showLine: true, offset: { ms: 950400000, px: 537 }, width: { ms: 86400000, px: 49 } },
        { time: 1659564000000, showLine: true, offset: { ms: 1036800000, px: 586 }, width: { ms: 86400000, px: 49 } },
        { time: 1659650400000, showLine: true, offset: { ms: 1123200000, px: 635 }, width: { ms: 86400000, px: 48 } },
        { time: 1659736800000, showLine: true, offset: { ms: 1209600000, px: 683 }, width: { ms: 86400000, px: 49 } },
        { time: 1659823200000, showLine: true, offset: { ms: 1296000000, px: 732 }, width: { ms: 86400000, px: 49 } },
        { time: 1659909600000, showLine: true, offset: { ms: 1382400000, px: 781 }, width: { ms: 86400000, px: 49 } },
        { time: 1659996000000, showLine: true, offset: { ms: 1468800000, px: 830 }, width: { ms: 86400000, px: 49 } },
        { time: 1660082400000, showLine: true, offset: { ms: 1555200000, px: 879 }, width: { ms: 86400000, px: 49 } },
        { time: 1660168800000, showLine: true, offset: { ms: 1641600000, px: 928 }, width: { ms: 86400000, px: 49 } },
        { time: 1660255200000, showLine: true, offset: { ms: 1728000000, px: 977 }, width: { ms: 86400000, px: 48 } },
        { time: 1660341600000, showLine: true, offset: { ms: 1814400000, px: 1025 }, width: { ms: 86400000, px: 49 } },
        { time: 1660428000000, showLine: true, offset: { ms: 1900800000, px: 1074 }, width: { ms: 86400000, px: 49 } },
        { time: 1660514400000, showLine: true, offset: { ms: 1987200000, px: 1123 }, width: { ms: 86400000, px: 49 } },
        { time: 1660600800000, showLine: true, offset: { ms: 2073600000, px: 1172 }, width: { ms: 86400000, px: 49 } },
        { time: 1660687200000, showLine: true, offset: { ms: 2160000000, px: 1221 }, width: { ms: 86400000, px: 49 } },
        { time: 1660773600000, showLine: true, offset: { ms: 2246400000, px: 1270 }, width: { ms: 86400000, px: 49 } },
        { time: 1660860000000, showLine: true, offset: { ms: 2332800000, px: 1319 }, width: { ms: 86400000, px: 48 } },
        { time: 1660946400000, showLine: true, offset: { ms: 2419200000, px: 1367 }, width: { ms: 86400000, px: 49 } },
        { time: 1661032800000, showLine: true, offset: { ms: 2505600000, px: 1416 }, width: { ms: 86400000, px: 49 } },
        { time: 1661119200000, showLine: true, offset: { ms: 2592000000, px: 1465 }, width: { ms: 86400000, px: 49 } },
        { time: 1661205600000, showLine: true, offset: { ms: 2678400000, px: 1514 }, width: { ms: 86400000, px: 49 } },
        { time: 1661292000000, showLine: true, offset: { ms: 2764800000, px: 1563 }, width: { ms: 86400000, px: 49 } },
        { time: 1661378400000, showLine: true, offset: { ms: 2851200000, px: 1612 }, width: { ms: 86400000, px: 48 } },
        { time: 1661464800000, showLine: true, offset: { ms: 2937600000, px: 1660 }, width: { ms: 86400000, px: 49 } },
        { time: 1661551200000, showLine: true, offset: { ms: 3024000000, px: 1709 }, width: { ms: 86400000, px: 49 } },
        { time: 1661637600000, showLine: true, offset: { ms: 3110400000, px: 1758 }, width: { ms: 86400000, px: 49 } },
        { time: 1661724000000, showLine: true, offset: { ms: 3196800000, px: 1807 }, width: { ms: 86400000, px: 49 } },
        { time: 1661810400000, showLine: true, offset: { ms: 3283200000, px: 1856 }, width: { ms: 86400000, px: 49 } },
        { time: 1661896800000, showLine: true, offset: { ms: 3369600000, px: 1905 }, width: { ms: 86400000, px: 49 } },
        { time: 1661983200000, showLine: true, offset: { ms: 3456000000, px: 1954 }, width: { ms: 86400000, px: 48 } },
        { time: 1662069600000, showLine: true, offset: { ms: 3542400000, px: 2002 }, width: { ms: 86400000, px: 49 } },
        { time: 1662156000000, showLine: true, offset: { ms: 3628800000, px: 2051 }, width: { ms: 86400000, px: 49 } },
        { time: 1662242400000, showLine: true, offset: { ms: 3715200000, px: 2100 }, width: { ms: 86400000, px: 49 } },
        { time: 1662328800000, showLine: true, offset: { ms: 3801600000, px: 2149 }, width: { ms: 86400000, px: 49 } },
        { time: 1662415200000, showLine: true, offset: { ms: 3888000000, px: 2198 }, width: { ms: 86400000, px: 49 } },
        { time: 1662501600000, showLine: true, offset: { ms: 3974400000, px: 2247 }, width: { ms: 86400000, px: 49 } },
        { time: 1662588000000, showLine: true, offset: { ms: 4060800000, px: 2296 }, width: { ms: 86400000, px: 48 } },
        { time: 1662674400000, showLine: true, offset: { ms: 4147200000, px: 2344 }, width: { ms: 86400000, px: 49 } },
        { time: 1662760800000, showLine: true, offset: { ms: 4233600000, px: 2393 }, width: { ms: 86400000, px: 49 } },
        { time: 1662847200000, showLine: true, offset: { ms: 4320000000, px: 2442 }, width: { ms: 86400000, px: 49 } },
        { time: 1662933600000, showLine: true, offset: { ms: 4406400000, px: 2491 }, width: { ms: 86400000, px: 49 } },
        { time: 1663020000000, showLine: true, offset: { ms: 4492800000, px: 2540 }, width: { ms: 86400000, px: 49 } },
        { time: 1663106400000, showLine: true, offset: { ms: 4579200000, px: 2589 }, width: { ms: 86400000, px: 49 } },
        { time: 1663192800000, showLine: true, offset: { ms: 4665600000, px: 2638 }, width: { ms: 86400000, px: 48 } },
        { time: 1663279200000, showLine: true, offset: { ms: 4752000000, px: 2686 }, width: { ms: 86400000, px: 49 } },
        { time: 1663365600000, showLine: true, offset: { ms: 4838400000, px: 2735 }, width: { ms: 86400000, px: 49 } },
        { time: 1663452000000, showLine: true, offset: { ms: 4924800000, px: 2784 }, width: { ms: 86400000, px: 49 } },
        { time: 1663538400000, showLine: true, offset: { ms: 5011200000, px: 2833 }, width: { ms: 86400000, px: 49 } },
        { time: 1663624800000, showLine: true, offset: { ms: 5097600000, px: 2882 }, width: { ms: 86400000, px: 49 } },
        { time: 1663711200000, showLine: true, offset: { ms: 5184000000, px: 2931 }, width: { ms: 86400000, px: 49 } },
        { time: 1663797600000, showLine: true, offset: { ms: 5270400000, px: 2980 }, width: { ms: 86400000, px: 48 } },
        { time: 1663884000000, showLine: true, offset: { ms: 5356800000, px: 3028 }, width: { ms: 86400000, px: 49 } },
        { time: 1663970400000, showLine: true, offset: { ms: 5443200000, px: 3077 }, width: { ms: 86400000, px: 49 } },
        { time: 1664056800000, showLine: true, offset: { ms: 5529600000, px: 3126 }, width: { ms: 86400000, px: 49 } },
        { time: 1664143200000, showLine: true, offset: { ms: 5616000000, px: 3175 }, width: { ms: 86400000, px: 49 } },
        { time: 1664229600000, showLine: true, offset: { ms: 5702400000, px: 3224 }, width: { ms: 86400000, px: 49 } },
        { time: 1664316000000, showLine: true, offset: { ms: 5788800000, px: 3273 }, width: { ms: 86400000, px: 48 } },
        { time: 1664402400000, showLine: true, offset: { ms: 5875200000, px: 3321 }, width: { ms: 86400000, px: 49 } },
        { time: 1664488800000, showLine: true, offset: { ms: 5961600000, px: 3370 }, width: { ms: 86400000, px: 49 } },
        { time: 1664575200000, showLine: true, offset: { ms: 6048000000, px: 3419 }, width: { ms: 86400000, px: 49 } },
        { time: 1664661600000, showLine: true, offset: { ms: 6134400000, px: 3468 }, width: { ms: 86400000, px: 49 } },
        { time: 1664748000000, showLine: true, offset: { ms: 6220800000, px: 3517 }, width: { ms: 86400000, px: 49 } },
        { time: 1664834400000, showLine: true, offset: { ms: 6307200000, px: 3566 }, width: { ms: 86400000, px: 49 } },
        { time: 1664920800000, showLine: true, offset: { ms: 6393600000, px: 3615 }, width: { ms: 86400000, px: 48 } },
        { time: 1665007200000, showLine: true, offset: { ms: 6480000000, px: 3663 }, width: { ms: 86400000, px: 49 } },
        { time: 1665093600000, showLine: true, offset: { ms: 6566400000, px: 3712 }, width: { ms: 86400000, px: 49 } },
        { time: 1665180000000, showLine: true, offset: { ms: 6652800000, px: 3761 }, width: { ms: 86400000, px: 49 } },
        { time: 1665266400000, showLine: true, offset: { ms: 6739200000, px: 3810 }, width: { ms: 86400000, px: 49 } },
        { time: 1665352800000, showLine: true, offset: { ms: 6825600000, px: 3859 }, width: { ms: 86400000, px: 49 } },
        { time: 1665439200000, showLine: true, offset: { ms: 6912000000, px: 3908 }, width: { ms: 86400000, px: 49 } },
        { time: 1665525600000, showLine: true, offset: { ms: 6998400000, px: 3957 }, width: { ms: 86400000, px: 48 } },
        { time: 1665612000000, showLine: true, offset: { ms: 7084800000, px: 4005 }, width: { ms: 86400000, px: 49 } },
        { time: 1665698400000, showLine: true, offset: { ms: 7171200000, px: 4054 }, width: { ms: 86400000, px: 49 } },
        { time: 1665784800000, showLine: true, offset: { ms: 7257600000, px: 4103 }, width: { ms: 86400000, px: 49 } },
        { time: 1665871200000, showLine: true, offset: { ms: 7344000000, px: 4152 }, width: { ms: 86400000, px: 49 } },
        { time: 1665957600000, showLine: true, offset: { ms: 7430400000, px: 4201 }, width: { ms: 86400000, px: 49 } },
        { time: 1666044000000, showLine: true, offset: { ms: 7516800000, px: 4250 }, width: { ms: 86400000, px: 49 } },
        { time: 1666130400000, showLine: true, offset: { ms: 7603200000, px: 4299 }, width: { ms: 86400000, px: 48 } },
        { time: 1666216800000, showLine: true, offset: { ms: 7689600000, px: 4347 }, width: { ms: 86400000, px: 49 } },
        { time: 1666303200000, showLine: true, offset: { ms: 7776000000, px: 4396 }, width: { ms: 86400000, px: 49 } },
        { time: 1666389600000, showLine: true, offset: { ms: 7862400000, px: 4445 }, width: { ms: 86400000, px: 49 } },
        { time: 1666476000000, showLine: true, offset: { ms: 7948800000, px: 4494 }, width: { ms: 86400000, px: 49 } },
        { time: 1666562400000, showLine: true, offset: { ms: 8035200000, px: 4543 }, width: { ms: 86400000, px: 49 } },
        { time: 1666648800000, showLine: true, offset: { ms: 8121600000, px: 4592 }, width: { ms: 86400000, px: 49 } },
        { time: 1666735200000, showLine: true, offset: { ms: 8208000000, px: 4641 }, width: { ms: 86400000, px: 48 } },
        { time: 1666821600000, showLine: true, offset: { ms: 8294400000, px: 4689 }, width: { ms: 86400000, px: 49 } },
        { time: 1666908000000, showLine: true, offset: { ms: 8380800000, px: 4738 }, width: { ms: 86400000, px: 49 } },
        { time: 1666994400000, showLine: true, offset: { ms: 8467200000, px: 4787 }, width: { ms: 86400000, px: 49 } },
        { time: 1667080800000, showLine: true, offset: { ms: 8553600000, px: 4836 }, width: { ms: 90000000, px: 51 } },
        { time: 1667170800000, showLine: true, offset: { ms: 8643600000, px: 4887 }, width: { ms: 86400000, px: 49 } },
        { time: 1667257200000, showLine: true, offset: { ms: 8730000000, px: 4936 }, width: { ms: 86400000, px: 49 } },
        { time: 1667343600000, showLine: true, offset: { ms: 8816400000, px: 4985 }, width: { ms: 86400000, px: 48 } },
        { time: 1667430000000, showLine: true, offset: { ms: 8902800000, px: 5033 }, width: { ms: 86400000, px: 49 } },
        { time: 1667516400000, showLine: true, offset: { ms: 8989200000, px: 5082 }, width: { ms: 86400000, px: 49 } },
        { time: 1667602800000, showLine: true, offset: { ms: 9075600000, px: 5131 }, width: { ms: 86400000, px: 49 } },
        { time: 1667689200000, showLine: true, offset: { ms: 9162000000, px: 5180 }, width: { ms: 86400000, px: 49 } },
        { time: 1667775600000, showLine: true, offset: { ms: 9248400000, px: 5229 }, width: { ms: 86400000, px: 49 } },
        { time: 1667862000000, showLine: true, offset: { ms: 9334800000, px: 5278 }, width: { ms: 86400000, px: 48 } },
        { time: 1667948400000, showLine: true, offset: { ms: 9421200000, px: 5326 }, width: { ms: 86400000, px: 49 } },
        { time: 1668034800000, showLine: true, offset: { ms: 9507600000, px: 5375 }, width: { ms: 86400000, px: 49 } },
        { time: 1668121200000, showLine: true, offset: { ms: 9594000000, px: 5424 }, width: { ms: 86400000, px: 49 } },
        { time: 1668207600000, showLine: true, offset: { ms: 9680400000, px: 5473 }, width: { ms: 86400000, px: 49 } },
        { time: 1668294000000, showLine: true, offset: { ms: 9766800000, px: 5522 }, width: { ms: 86400000, px: 49 } },
        { time: 1668380400000, showLine: true, offset: { ms: 9853200000, px: 5571 }, width: { ms: 86400000, px: 49 } },
        { time: 1668466800000, showLine: true, offset: { ms: 9939600000, px: 5620 }, width: { ms: 86400000, px: 48 } },
        { time: 1668553200000, showLine: true, offset: { ms: 10026000000, px: 5668 }, width: { ms: 86400000, px: 49 } },
        { time: 1668639600000, showLine: true, offset: { ms: 10112400000, px: 5717 }, width: { ms: 86400000, px: 49 } },
        { time: 1668726000000, showLine: true, offset: { ms: 10198800000, px: 5766 }, width: { ms: 86400000, px: 49 } },
        { time: 1668812400000, showLine: true, offset: { ms: 10285200000, px: 5815 }, width: { ms: 86400000, px: 49 } },
        { time: 1668898800000, showLine: true, offset: { ms: 10371600000, px: 5864 }, width: { ms: 86400000, px: 49 } },
        { time: 1668985200000, showLine: true, offset: { ms: 10458000000, px: 5913 }, width: { ms: 86400000, px: 49 } },
        { time: 1669071600000, showLine: true, offset: { ms: 10544400000, px: 5962 }, width: { ms: 86400000, px: 48 } },
        { time: 1669158000000, showLine: true, offset: { ms: 10630800000, px: 6010 }, width: { ms: 86400000, px: 49 } },
        { time: 1669244400000, showLine: true, offset: { ms: 10717200000, px: 6059 }, width: { ms: 86400000, px: 49 } },
        { time: 1669330800000, showLine: true, offset: { ms: 10803600000, px: 6108 }, width: { ms: 86400000, px: 49 } },
        { time: 1669417200000, showLine: true, offset: { ms: 10890000000, px: 6157 }, width: { ms: 86400000, px: 49 } },
        { time: 1669503600000, showLine: true, offset: { ms: 10976400000, px: 6206 }, width: { ms: 86400000, px: 49 } },
        { time: 1669590000000, showLine: true, offset: { ms: 11062800000, px: 6255 }, width: { ms: 86400000, px: 49 } },
        { time: 1669676400000, showLine: true, offset: { ms: 11149200000, px: 6304 }, width: { ms: 86400000, px: 48 } },
        { time: 1669762800000, showLine: true, offset: { ms: 11235600000, px: 6352 }, width: { ms: 86400000, px: 49 } },
        { time: 1669849200000, showLine: true, offset: { ms: 11322000000, px: 6401 }, width: { ms: 86400000, px: 49 } },
        { time: 1669935600000, showLine: true, offset: { ms: 11408400000, px: 6450 }, width: { ms: 86400000, px: 49 } },
        { time: 1670022000000, showLine: true, offset: { ms: 11494800000, px: 6499 }, width: { ms: 86400000, px: 49 } },
        { time: 1670108400000, showLine: true, offset: { ms: 11581200000, px: 6548 }, width: { ms: 86400000, px: 49 } },
        { time: 1670194800000, showLine: true, offset: { ms: 11667600000, px: 6597 }, width: { ms: 86400000, px: 49 } },
        { time: 1670281200000, showLine: true, offset: { ms: 11754000000, px: 6646 }, width: { ms: 86400000, px: 48 } },
        { time: 1670367600000, showLine: true, offset: { ms: 11840400000, px: 6694 }, width: { ms: 86400000, px: 49 } },
        { time: 1670454000000, showLine: true, offset: { ms: 11926800000, px: 6743 }, width: { ms: 86400000, px: 49 } },
        { time: 1670540400000, showLine: true, offset: { ms: 12013200000, px: 6792 }, width: { ms: 86400000, px: 49 } },
        { time: 1670626800000, showLine: true, offset: { ms: 12099600000, px: 6841 }, width: { ms: 86400000, px: 49 } },
        { time: 1670713200000, showLine: true, offset: { ms: 12186000000, px: 6890 }, width: { ms: 86400000, px: 49 } },
        { time: 1670799600000, showLine: true, offset: { ms: 12272400000, px: 6939 }, width: { ms: 86400000, px: 48 } },
        { time: 1670886000000, showLine: true, offset: { ms: 12358800000, px: 6987 }, width: { ms: 86400000, px: 49 } },
        { time: 1670972400000, showLine: true, offset: { ms: 12445200000, px: 7036 }, width: { ms: 86400000, px: 49 } },
        { time: 1671058800000, showLine: true, offset: { ms: 12531600000, px: 7085 }, width: { ms: 86400000, px: 49 } },
        { time: 1671145200000, showLine: true, offset: { ms: 12618000000, px: 7134 }, width: { ms: 86400000, px: 49 } },
        { time: 1671231600000, showLine: true, offset: { ms: 12704400000, px: 7183 }, width: { ms: 86400000, px: 49 } },
        { time: 1671318000000, showLine: true, offset: { ms: 12790800000, px: 7232 }, width: { ms: 86400000, px: 49 } },
        { time: 1671404400000, showLine: true, offset: { ms: 12877200000, px: 7281 }, width: { ms: 86400000, px: 48 } },
        { time: 1671490800000, showLine: true, offset: { ms: 12963600000, px: 7329 }, width: { ms: 86400000, px: 49 } },
        { time: 1671577200000, showLine: true, offset: { ms: 13050000000, px: 7378 }, width: { ms: 86400000, px: 49 } },
        { time: 1671663600000, showLine: true, offset: { ms: 13136400000, px: 7427 }, width: { ms: 86400000, px: 49 } },
        { time: 1671750000000, showLine: true, offset: { ms: 13222800000, px: 7476 }, width: { ms: 86400000, px: 49 } },
        { time: 1671836400000, showLine: true, offset: { ms: 13309200000, px: 7525 }, width: { ms: 86400000, px: 49 } },
        { time: 1671922800000, showLine: true, offset: { ms: 13395600000, px: 7574 }, width: { ms: 86400000, px: 49 } },
        { time: 1672009200000, showLine: true, offset: { ms: 13482000000, px: 7623 }, width: { ms: 86400000, px: 48 } },
        { time: 1672095600000, showLine: true, offset: { ms: 13568400000, px: 7671 }, width: { ms: 86400000, px: 49 } },
        { time: 1672182000000, showLine: true, offset: { ms: 13654800000, px: 7720 }, width: { ms: 86400000, px: 49 } },
        { time: 1672268400000, showLine: true, offset: { ms: 13741200000, px: 7769 }, width: { ms: 86400000, px: 49 } },
        { time: 1672354800000, showLine: true, offset: { ms: 13827600000, px: 7818 }, width: { ms: 86400000, px: 49 } },
        { time: 1672441200000, showLine: true, offset: { ms: 13914000000, px: 7867 }, width: { ms: 86400000, px: 49 } },
        { time: 1672527600000, showLine: true, offset: { ms: 14000400000, px: 7916 }, width: { ms: 86400000, px: 49 } },
        { time: 1672614000000, showLine: true, offset: { ms: 14086800000, px: 7965 }, width: { ms: 86400000, px: 48 } },
        { time: 1672700400000, showLine: true, offset: { ms: 14173200000, px: 8013 }, width: { ms: 86400000, px: 49 } },
        { time: 1672786800000, showLine: true, offset: { ms: 14259600000, px: 8062 }, width: { ms: 86400000, px: 49 } },
        { time: 1672873200000, showLine: true, offset: { ms: 14346000000, px: 8111 }, width: { ms: 86400000, px: 49 } },
        { time: 1672959600000, showLine: true, offset: { ms: 14432400000, px: 8160 }, width: { ms: 86400000, px: 49 } },
        { time: 1673046000000, showLine: true, offset: { ms: 14518800000, px: 8209 }, width: { ms: 86400000, px: 49 } },
        { time: 1673132400000, showLine: true, offset: { ms: 14605200000, px: 8258 }, width: { ms: 86400000, px: 49 } },
        { time: 1673218800000, showLine: true, offset: { ms: 14691600000, px: 8307 }, width: { ms: 86400000, px: 48 } },
        { time: 1673305200000, showLine: true, offset: { ms: 14778000000, px: 8355 }, width: { ms: 86400000, px: 49 } },
        { time: 1673391600000, showLine: true, offset: { ms: 14864400000, px: 8404 }, width: { ms: 86400000, px: 49 } },
        { time: 1673478000000, showLine: true, offset: { ms: 14950800000, px: 8453 }, width: { ms: 86400000, px: 49 } },
        { time: 1673564400000, showLine: true, offset: { ms: 15037200000, px: 8502 }, width: { ms: 86400000, px: 49 } },
        { time: 1673650800000, showLine: true, offset: { ms: 15123600000, px: 8551 }, width: { ms: 86400000, px: 49 } },
        {
          time: 1673737200000,
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        }
      ]
    };
    fixture.detectChanges();

    // const elements = document.getElementsByClassName('executions-gantt-task-chart-item');
    // expect(elements.length).toEqual(1);
    expect(component).toBeTruthy();
  });

  it('sould 0 lines if not exist stepToday', () => {
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
      }
    ];
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: true, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        { time: 1658613600000, showLine: true, offset: { ms: 86400000, px: 48 }, width: { ms: 86400000, px: 49 } },
        { time: 1658700000000, showLine: true, offset: { ms: 172800000, px: 97 }, width: { ms: 86400000, px: 49 } }
      ]
    };
    fixture.detectChanges();

    const elements = document.getElementsByClassName('vertical-lines');
    expect(elements.length).toEqual(0);
  });

  it('return itemId - collapsed value when call trackByFn', () => {
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
    const valueReturn: string = component.trackByFn(0, task);
    expect(`${task.id}-${task.collapsed}`).toBe(valueReturn);
  });

  it('should return line today if exist', () => {
    const todayTime: number = startOfDay(new Date()).getTime();
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: true, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        { time: 1658613600000, showLine: true, offset: { ms: 86400000, px: 48 }, width: { ms: 86400000, px: 49 } },
        {
          time: todayTime,
          showLine: true,
          offset: { ms: 15210000000, px: 8600 },
          width: { ms: 1658613600000, px: 48 }
        }
      ]
    };
    fixture.detectChanges();
    const lineToday: GridLinesInterface = {
      key: `${todayTime}`,
      x1: `8624`,
      y1: '0',
      x2: '8624',
      y2: `100%`,
      color: '#C55302'
    };
    const getReturn: GridLinesInterface | null = component.line;

    expect(getReturn).toEqual(lineToday);
  });

  it('should return line null if not exist today', () => {
    component.times = {
      width: 8648,
      timePerPixel: 1768576,
      firstTaskTime: 1662501600000,
      lastTaskTime: 1671145200000,
      firstTime: 1658527200000,
      lastTime: 1673823600000,
      steps: [
        { time: 1658527200000, showLine: true, offset: { ms: 0, px: 0 }, width: { ms: 86400000, px: 48 } },
        { time: 1658613600000, showLine: true, offset: { ms: 86400000, px: 48 }, width: { ms: 86400000, px: 49 } }
      ]
    };
    fixture.detectChanges();

    const getReturn: GridLinesInterface | null = component.line;

    expect(getReturn).toBe(null);
  });

  it('should return 60 if collapsed', () => {
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
      }
    ];
    fixture.detectChanges();
    expect(component.totalHeight).toEqual(60);
  });

  it('should return 120 if  not collapsed and childs lengt == 1', () => {
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
        collapsed: false,
        text: '',
        massiveId: null,
        closedTime: null,
        binomioAsignedTo: null,
        temporalAsignedTo: null,

        childs: [
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
            collapsed: false,
            text: '',
            massiveId: null,
            closedTime: null,
            binomioAsignedTo: null,
            temporalAsignedTo: null,

            childs: []
          }
        ]
      }
    ];
    fixture.detectChanges();
    expect(component.totalHeight).toEqual(120);
  });

  it('should return 60 if  not collapsed and not childs', () => {
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
        collapsed: false,
        text: '',
        massiveId: null,
        closedTime: null,
        binomioAsignedTo: null,
        temporalAsignedTo: null,

        childs: []
      }
    ];
    fixture.detectChanges();
    expect(component.totalHeight).toEqual(60);
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
