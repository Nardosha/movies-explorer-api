import { INTERSECTION_ERROR_CODE } from '../constants.js';

export class IntersectionError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = INTERSECTION_ERROR_CODE;
  }
}
