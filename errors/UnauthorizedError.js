import { UNAUTHORIZED_ERROR_CODE } from '../constants.js';

export class UnauthorizedError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}
