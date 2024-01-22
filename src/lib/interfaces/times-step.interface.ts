import { TimeStepConfigInterface } from './time-step-config.interface';

/**
 * TimesStepInterface
 */
export interface TimesStepInterface {
  time: number;
  showLine: boolean;
  offset: TimeStepConfigInterface;
  width: TimeStepConfigInterface;
}
