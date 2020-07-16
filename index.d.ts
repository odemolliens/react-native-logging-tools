import { IInit } from './src/model';
import { IInstabug } from './src/model/instabug';
import { ISentry } from './src/model/sentry';
import {ITealium} from "./src/model/tealium";

declare const init: (initConfig: IInit) => void;

declare const setupReactotron: (config?: any, plugins?: Array<Function>) => void;

declare const createTealiumLogger: (tealium: any, config: ITealium, printError?: boolean) => void;
declare const createAdobeLogger: (adobeAnalytics: any, adobeLogger: any, printError?: boolean) => void;
declare const createFirebaseLogger: (analytics: any, printError?: boolean) => void;
declare const createCrashlyticsLogger: (crashlytics: any, printError?: boolean) => void;
declare const createSentryLogger: (sentry: any, config: ISentry, printError?: boolean) => void;
declare const createInstabugLogger: (instabug: any, config: IInstabug, printError?: boolean) => void;

declare const logEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logDebugEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logErrorEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logNetworkEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const logWarningEvent: (event: string, params?: any, sensitiveData?: boolean) => void;
declare const recordError: (event: string, params?: any) => void;
