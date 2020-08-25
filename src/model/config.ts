export interface IExcludeLogs {
  adobe?: Array<number>;
  crashlytics?: Array<number>;
  firebase?: Array<number>;
  instabug?: Array<number>;
  sentry?: Array<number>;
  tealium?: Array<number>;
}

export interface IConfig {
  Reactotron?: any;
  AsyncStorage?: any;
  reportJSErrors?: boolean;
  isSensitiveBuild?: boolean;
  excludeLogs?: IExcludeLogs;
  useFlipperPlugin?: boolean;
  addPlugin?: (config: any) => void;
}
