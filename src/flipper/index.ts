import { addPlugin } from 'react-native-flipper';
import { getCurrentDateTime } from '../helpers/functions';

export default class FlipperConnectionManager {
  private flipperConnection?: any;

  constructor() {
    /* istanbul ignore next */addPlugin({
      runInBackground: () => true,
      getId() {
        return 'flipper-plugin-react-native-logging-tools';
      },
      onConnect: this.handleConnect,
      onDisconnect: this.handleDisconnect,
    });
  }

  handleConnect = (connection: any) => {
    this.flipperConnection = connection;
  };

  handleDisconnect = () => {
    this.flipperConnection = undefined;
  };

  send(service: string, event: string, params?: any, error?: any) {
    const payload: any = {
      service,
      event,
      params,
      error,
      time: getCurrentDateTime(),
    };

    if (this.flipperConnection) {
      this.flipperConnection.send('action', payload);
    }
  }
}
