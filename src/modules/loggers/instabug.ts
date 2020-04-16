export const createInstabugLogger = (instabug: any, token: string, printError: boolean = false) => {
  instabug.startWithToken(token);
  // @ts-ignore
  return (event: string, params: any) => {
    try {
      instabug.logUserEventWithName(event);
    } catch (error) {
      if (printError) {
        console.log('Error: Unable to tag instabug event:', error);
      }
    }
  };
};
