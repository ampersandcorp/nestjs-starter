import { ValueTransformer } from 'typeorm';

export class DateTimeColumnTransformer<T extends Date | null | string = Date> implements ValueTransformer {
  to(value: T): T | null {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    if (typeof value === 'string') {
      return new Date(value) as T;
    }

    if (value instanceof Date) {
      return value as T;
    }

    throw new Error('Unsupported input type for DateTimeColumnTransformer');
  }

  from(value: T | null): T | null {
    if (value === null) {
      return value;
    }

    if (typeof value === 'string') {
      return new Date(value) as T;
    }

    if (value instanceof Date) {
      return value as T;
    }

    throw new Error('Unsupported input type for DateTimeColumnTransformer');
  }
}
