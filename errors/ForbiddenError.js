import { FORBIDDEN_ERROR_CODE } from '../utils/constants.js';

export class ForbiddenError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}
