import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../middleware/errorHandler';

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    };
    next = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 500 with error message', () => {
    const err = new Error('Test error');
    errorHandler(err, req as Request, res as Response, next);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Test error',
    });
  });

  it('returns "Internal Server Error" when message is empty', () => {
    const err = new Error();
    err.message = '';
    errorHandler(err, req as Request, res as Response, next);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error',
    });
  });

  it('logs the error stack', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('Stack test');
    errorHandler(err, req as Request, res as Response, next);
    expect(consoleSpy).toHaveBeenCalledWith(err.stack);
  });
});
