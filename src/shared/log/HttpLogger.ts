import dayjs from 'dayjs';
import { InputLogEvent } from '@aws-sdk/client-cloudwatch-logs';
import { IS_PRODUCTION } from '../../config';
import { CloudWatchLogger, LogEntry } from './CloudWatchLogger';
import { Snowflake } from '../common/Snowflake';

type Environment = 'production' | 'development';
type LoggingContext = 'request' | 'response';
type LogStreamName = `${Environment}/http-logger/${LoggingContext}`;

interface HttpLogEntry extends HttpLogBody, LogEntry {}

interface HttpLogBody {
  context: LoggingContext;
  url: string;
  method: string;
  body: object;
  headers: object;
}

export class HttpLogger extends CloudWatchLogger {
  constructor(context: LoggingContext, traceId: string = Snowflake.generate()) {
    super(traceId);

    const logStreamName: LogStreamName = `${IS_PRODUCTION ? 'production' : 'development'}/http-logger/${context}`;
    this.logStreamName = logStreamName;
  }

  async log<T>(body: HttpLogBody & T, message: string = ''): Promise<void> {
    const logEntry: HttpLogEntry = {
      timestamp: Date.now(),
      datetime: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      traceId: this.getTraceId(),
      message: message,
      ...body,
    };

    const logEvents: InputLogEvent[] = [
      {
        message: JSON.stringify(logEntry),
        timestamp: logEntry.timestamp,
      },
    ];

    await this.sendLog(logEvents);
  }
}
