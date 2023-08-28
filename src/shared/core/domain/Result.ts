export class Result<T> {
  private readonly _value?: T;

  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error(this.error as string);
    }

    return this._value as T;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok();
  }
}
