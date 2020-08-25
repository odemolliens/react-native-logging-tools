import FlipperConnectionManager from '../index';
import { getCurrentDateTime } from '../../helpers/functions';

jest.mock('../../helpers/functions', () => ({
  getCurrentDateTime: jest.fn(),
}));

describe('flipper test suite', () => {
  it('should check pluggin run in background status', () => {
    const flipper = new FlipperConnectionManager();
    expect(flipper.flipperConfig.runInBackground()).toEqual(true);
  });

  it('should check pluggin id', () => {
    const flipper = new FlipperConnectionManager();
    expect(flipper.flipperConfig.getId()).toEqual('flipper-plugin-react-native-logging-tools');
  });

  it('should init properly flipper and send event', () => {
    const flipper = new FlipperConnectionManager();
    flipper.handleConnect({ send: jest.fn() });
    flipper.send('service', 'event');
    expect(getCurrentDateTime).toHaveBeenCalledTimes(1);
    flipper.handleDisconnect();
  });
});
