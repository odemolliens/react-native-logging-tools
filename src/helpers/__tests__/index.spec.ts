import { getCurrentDateTime } from '../functions';

describe('functions test suite', () => {
  it('check current date time function', () => {
    getCurrentDateTime();
    expect(getCurrentDateTime(new Date('2019-06-25T11:00:31.983Z'))).toEqual('2019-6-25 13:0:31');
  });
});
