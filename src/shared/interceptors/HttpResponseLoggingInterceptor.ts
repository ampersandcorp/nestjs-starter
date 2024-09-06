import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TRACE_ID_HEADER_KEY } from '../middlewares/TraceIdIssuanceMiddleware';
import { HttpLogger } from '../log/HttpLogger';

@Injectable()
export class HttpResponseLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const traceId = request.headers[TRACE_ID_HEADER_KEY] || '';
    const logger = new HttpLogger('response', traceId);

    return next.handle().pipe(
      map((data) => {
        return {
          traceId: traceId,
          ...data,
        };
      }),
      tap(async (data) => {
        await logger.log({
          context: 'response',
          url: request.url,
          method: request.method,
          body: data as object,
          headers: response.getHeaders(),
        });
      }),
    );
  }
}
