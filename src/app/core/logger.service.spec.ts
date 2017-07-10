import { LoggerService } from './logger.service';

describe('CORE: LoggerService', () => {
  beforeEach(() => {
    // spies
    spyOn(console, 'log');
    spyOn(console, 'error');
    spyOn(console, 'warn');
  });

  describe('api', () => {
    it('should have defined methods', () => {
      expect(LoggerService.log).toBeDefined();
      expect(LoggerService.error).toBeDefined();
      expect(LoggerService.warn).toBeDefined();
    });
  });

  describe('behaviour', () => {
    it('should log', () => {
      LoggerService.log('Log something');
      expect(console.log).toHaveBeenCalledWith('Log something');
    });

    it('should error', () => {
      LoggerService.error('Log this error');
      expect(console.error).toHaveBeenCalledWith('Log this error');
    });

    it('should warn', () => {
      LoggerService.warn('Log this warning');
      expect(console.warn).toHaveBeenCalledWith('Log this warning');
    });
  });
});
