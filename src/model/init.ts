import { IConfig } from './config';

export interface IInit {
  config?: IConfig;
  analytics?: Function[];
  errorReporters?: Function[];
}
