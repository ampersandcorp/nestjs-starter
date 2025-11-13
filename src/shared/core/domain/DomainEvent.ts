import { UniqueEntityID } from './UniqueEntityID';

export interface DomainEvent {
  readonly aggregateId: UniqueEntityID;
  readonly eventType: string;
  readonly occurredAt: Date;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly aggregateId: UniqueEntityID;
  public readonly eventType: string;
  public readonly occurredAt: Date;

  protected constructor(aggregateId: UniqueEntityID, eventType: string) {
    this.aggregateId = aggregateId;
    this.eventType = eventType;
    this.occurredAt = new Date();
  }
}
