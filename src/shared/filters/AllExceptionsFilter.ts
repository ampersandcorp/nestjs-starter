import jwt from 'jsonwebtoken';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import { IS_LOCAL, IS_PRODUCTION, IS_TEST } from '../../config';
import { AUTH_HEADER, InternalJwtPayload } from '../../auth/domain/JwtStrategy';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpMethod = ctx.getRequest().method;
    const httpBody = ctx.getRequest().body;
    const url = httpAdapter.getRequestUrl(ctx.getRequest());

    const stack = exception instanceof Error ? exception.stack : exception as string;
    const message = exception instanceof Error ? exception.message : exception;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: url,
      ok: false,
      error: {
        message: message,
        stack: this.needToShowStack() && stack
          ? stack
            .toString()
            .split('\n')
            .map(line => line.trim())
          : [],
      },
      result: {},
    };

    if (exception instanceof HttpException) {
      responseBody.result = exception.getResponse();
    }

    try {
      if (this.needToSendSlack(httpStatus)) {
        const messageBody = `*${httpStatus} | ${httpMethod} ${url} | ${message}*\nRequest Payload: ${JSON.stringify(httpBody)}\nRequest User: ${this.getAuthedUser(ctx) ?? 'unknown'}\n${stack}`;
        console.log(messageBody);
      }
    } catch (error) {}

    this.logger.error(`${httpStatus} | ${httpMethod} ${url} | ${message}`);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private needToShowStack(): boolean {
    return !IS_PRODUCTION;
  }

  private needToSendSlack(statusCode: number): boolean {
    if (statusCode === HttpStatus.UNAUTHORIZED) {
      return false;
    }

    if (IS_LOCAL || IS_TEST) {
      return false;
    }

    return true;
  }

  private getSlackChannel(): string {
    return '';
  }

  private getAuthedUser(context: HttpArgumentsHost): string | null {
    try {
      const authHeader = context.getRequest()?.header(AUTH_HEADER);
      if (!authHeader) {
        return null;
      }

      const payload = jwt.decode(authHeader) as InternalJwtPayload;

      return payload.email;
    } catch (error) {
      return null;
    }
  }
}
