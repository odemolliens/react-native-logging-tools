import FlipperConnectionManager from '../index';
import { getCurrentDateTime } from '../../helpers/functions';

jest.mock('../../helpers/functions', () => ({
  getCurrentDateTime: jest.fn(),
}));

describe('flipper test suite', () => {
  it('should init properly flipper and send event', () => {
    const flipper = new FlipperConnectionManager();
    flipper.handleConnect({ send: jest.fn() });
    flipper.send('service', 'event');
    expect(getCurrentDateTime).toHaveBeenCalledTimes(1);
    flipper.handleDisconnect();
  });
});
