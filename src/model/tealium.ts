export interface ITealiumConfig {
  account: string;
  profile: string;
  environment: 'dev' | 'qa' | 'prod';
  dataSource?: string;
  collectors: Collectors[];
  dispatchers: Dispatchers[];
  customVisitorId?: string;
  memoryReportingEnabled?: boolean;
  overrideCollectURL?: string;
  overrideCollectBatchURL?: string;
  overrideCollectDomain?: string;
  overrideLibrarySettingsURL?: string;
  overrideTagManagementURL?: string;
  deepLinkTrackingEnabled?: boolean;
  qrTraceEnabled?: boolean;
  loglevel?: 'dev' | 'qa' | 'prod' | 'silent';
  consentLoggingEnabled?: boolean;
  consentPolicy?: 'ccpa' | 'gdpr';
  consentExpiry?: { time: number, unit: 'minutes' | 'hours' | 'months' | 'days' };
  batchingEnabled?: boolean;
  lifecycleAutotrackingEnabled?: boolean;
  useRemoteLibrarySettings?: boolean;
  visitorServiceEnabled?: boolean;
}

export enum Collectors {
  AppData = 'AppData',
  Connectivity = 'Connectivity',
  DeviceData = 'DeviceData',
  Lifecycle = 'Lifecycle',
}

export enum Dispatchers {
  Collect = 'Collect',
  TagManagement = 'TagManagement',
  RemoteCommands = 'RemoteCommands',
}
