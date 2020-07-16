export const createAdobeLogger = (adobeAnalytics: any, adobeLogger: any, printError: boolean = false) => {
  adobeAnalytics.registerExtension();
  return (event: string, params: any) => {
    try {
      adobeLogger.trackAction(event, params);
    } catch (error) {
      if (printError) {
        console.log('Error: Unable to tag adobe event:', error);
      }
    }
  };
};
