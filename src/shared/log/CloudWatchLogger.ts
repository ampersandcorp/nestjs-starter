import {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  DescribeLogGroupsCommand,
  DescribeLogStreamsCommand,
  InputLogEvent,
  PutLogEventsCommand,
  ResourceAlreadyExistsException,
  ResourceNotFoundException,
} from '@aws-sdk/client-cloudwatch-logs';
import { Logger } from '@nestjs/common';
import { config, IS_LOCAL } from '../../config';

export interface LogEntry {
  timestamp: number;
  datetime: string;
  traceId: string;
  message: string;
}

export abstract class CloudWatchLogger {
  private readonly logger = new Logger(this.constructor.name);
  private readonly client: CloudWatchLogsClient;
  private readonly traceId: string;
  private readonly logGroupName: string = '/aws/application/api';
  protected logStreamName: string = '';

  protected constructor(traceId: string) {
    this.client = new CloudWatchLogsClient({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: config.AWS.CLOUDWATCH.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.CLOUDWATCH.SECRET_ACCESS_KEY,
      },
    });
    this.traceId = traceId;
  }

  protected abstract log<T extends LogEntry>(body: T, message: string): Promise<void>;

  protected getTraceId(): string {
    return this.traceId;
  }

  protected async sendLog(logEvents: InputLogEvent[]): Promise<void> {
    try {
      await this.validateClient();
    } catch (error) {
      return;
    }

    this.ensureLogStreamIsDefined();
    await this.ensureLogStreamExists();

    const params = {
      logGroupName: this.logGroupName,
      logStreamName: this.logStreamName,
      logEvents: logEvents,
    };

    if (IS_LOCAL) {
      this.logger.log(`${JSON.stringify(params, null, 2)}`);
      return;
    }

    try {
      const command = new PutLogEventsCommand(params);
      await this.client.send(command);
    } catch (error) {
      this.logger.error(`Error sending log events: ${error}`);
    }
  }

  private async validateClient(): Promise<void> {
    const command = new DescribeLogGroupsCommand({
      limit: 1,
    });

    await this.client.send(command);
  }

  private ensureLogStreamIsDefined(): void {
    if (this.logStreamName === '') {
      throw new Error(`${this.constructor.name} Log stream name is not defined`);
    }
  }

  private async ensureLogStreamExists(): Promise<void> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const describeCommand = new DescribeLogStreamsCommand({
          logGroupName: this.logGroupName,
          logStreamNamePrefix: this.logStreamName,
        });
        const describeResponse = await this.client.send(describeCommand);

        if (describeResponse.logStreams && describeResponse.logStreams.length > 0) {
          return;
        }

        const createCommand = new CreateLogStreamCommand({
          logGroupName: this.logGroupName,
          logStreamName: this.logStreamName,
        });
        await this.client.send(createCommand);
        return;
      } catch (error) {
        if (error instanceof ResourceNotFoundException) {
          this.logger.error(`Log group ${this.logGroupName} does not exist. Please create it first.`);
          throw error;
        } else if (error instanceof ResourceAlreadyExistsException) {
          this.logger.log(`Log stream ${this.logStreamName} already exists.`);
          return;
        } else {
          this.logger.error(`Error ensuring log stream exists: ${error}`);
          retries++;
          if (retries >= maxRetries) {
            throw error;
          }

          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 100));
        }
      }
    }
  }
}
