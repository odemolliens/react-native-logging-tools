import { IInit } from './src/model';
import { IInstabug } from './src/model/instabug';
import { ISentry } from './src/model/sentry';
import { ITealiumConfig } from './src/model/tealium';

declare const DEBUG_LOG: number;
declare const ERROR_LOG: number;
declare const NETWORK_LOG: number;
declare const WARNING_LOG: number;

declare const init: (initConfig: IInit) => void;

declare const setupReactotron: (config?: any, plugins?: Array<Function>) => any;

declare const createAdobeLogger: (ACPAnalytics: any, ACPCore: any, printLogs?: boolean) => Function;
declare const createCrashlyticsLogger: (crashlytics: any, printLogs?: boolean) => Function;
declare const createFirebaseLogger: (analytics: any, printLogs?: boolean) => Function;
declare const createInstabugLogger: (instabug: any, config: IInstabug, printLogs?: boolean) => Function;
declare const createReactotronLogger: (reactotron: any, printLogs?: boolean) => Function;
declare const createSentryLogger: (sentry: any, config: ISentry, printLogs?: boolean) => Function;
declare const createTealiumLogger: (Tealium: any, config: ITealiumConfig, printLogs?: boolean) => Function;

declare const logDebugEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logErrorEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logNetworkEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logWarningEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const recordError: (event: string, params?: any) => void;
