import config from './config';

describe('config', () => {
  it('has defaults', () => {
    expect(config.HOST).toBe('localhost');
    expect(config.PORT).toBe(9000);
    expect(config.isBrowser).toBe(true);
    expect(config.isDev).toBe(true);
  });
});
