import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { TRACE_ID_HEADER_KEY } from '../middlewares/TraceIdIssuanceMiddleware';
import { HttpLogger } from '../log/HttpLogger';

@Injectable()
export class HttpRequestLoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();

    const logger = new HttpLogger('request', request.headers[TRACE_ID_HEADER_KEY]);
    await logger.log({
      context: 'request',
      url: request.originalUrl,
      method: request.method,
      body: request.body,
      headers: request.headers,
    });

    return next.handle();
  }
}
