import { applyDecorators, SetMetadata, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpResponseLoggingInterceptor } from '../interceptors/HttpResponseLoggingInterceptor';
import { HttpRequestLoggingInterceptor } from '../interceptors/HttpRequestLoggingInterceptor';
import { AllExceptionsFilter } from '../filters/AllExceptionsFilter';

export const LOG_ENABLED_METADATA = 'LOG_ENABLED_METADATA';

export interface LogEnabledOptions {
  debug?: boolean;
}

export function LogEnabled(
  options: LogEnabledOptions = { debug: false },
): MethodDecorator {
  return applyDecorators(
    SetMetadata(LOG_ENABLED_METADATA, options),
    UseFilters(AllExceptionsFilter),
    UseInterceptors(HttpResponseLoggingInterceptor, HttpRequestLoggingInterceptor),
  );
}
