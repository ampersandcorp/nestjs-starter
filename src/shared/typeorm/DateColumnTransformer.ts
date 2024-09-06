import dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';

export class DateColumnTransformer<T extends Date | null | string = Date> implements ValueTransformer {
  to(value: T): T | null {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    if (typeof value === 'string' || value instanceof Date) {
      return dayjs(value).startOf('day').toDate() as T;
    }

    throw new Error('Unsupported input type for DateColumnTransformer');
  }

  from(value: T | null): T | null {
    if (value === null) {
      return value;
    }

    if (typeof value === 'string' || value instanceof Date) {
      return dayjs(value).startOf('day').toDate() as T;
    }

    throw new Error('Unsupported input type for DateColumnTransformer');
  }
}
