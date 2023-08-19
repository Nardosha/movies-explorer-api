import { FORBIDDEN_ERROR_CODE } from '../utils/constants';

export class ForbiddenError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}
