import { BAD_REQUEST_ERROR_CODE } from '../utils/constants.js';

export class BadRequestError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}
