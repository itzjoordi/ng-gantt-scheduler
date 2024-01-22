import { TimesStepInterface } from './times-step.interface';

/**
 * OptionsTimesInterface
 */
export interface OptionsTimesInterface {
  width: number;
  timePerPixel: number;
  firstTaskTime: number;
  lastTaskTime: number;
  firstTime: number;
  lastTime: number;
  steps: TimesStepInterface[];
}
