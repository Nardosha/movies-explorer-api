import { INTERSECTION_ERROR_CODE } from '../utils/constants';

export class IntersectionError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = INTERSECTION_ERROR_CODE;
  }
}
