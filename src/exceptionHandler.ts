import { recordError } from './modules/events';

export default function setupExceptionHandler() {
  // @ts-ignore
  global.ErrorUtils.setGlobalHandler(
    /* istanbul ignore next */ (...args: any[]) => {
      const error = args[0] || 'Unknown Error';

      if (error instanceof Error) {
        const splittedStack = error.stack ? error.stack.split('\n') : [];
        const firstLine = splittedStack.length > 0 ? splittedStack[0] : '';
        const stackTrace = firstLine ? firstLine.split('@') : '';
        const className = stackTrace && stackTrace.length > 0 ? stackTrace[0] : '';

        recordError(`Fatal JS error: ${className}`, {
          priority: 1,
          message: error.message,
          stack: error.stack,
        });
      } else {
        recordError(`Fatal JS error: ${error}`);
      }
    },
  );
}
