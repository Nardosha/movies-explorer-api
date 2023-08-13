import { NOT_FOUND_ERROR_CODE } from '../constants.js';

export class NotFoundError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}
