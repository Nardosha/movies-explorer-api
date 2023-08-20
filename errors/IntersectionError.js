import { INTERSECTION_ERROR_CODE } from '../utils/constants.js';

export class IntersectionError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = INTERSECTION_ERROR_CODE;
  }
}
