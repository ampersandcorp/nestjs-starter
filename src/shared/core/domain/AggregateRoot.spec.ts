import { AggregateRoot } from './AggregateRoot';
import { UniqueEntityID } from './UniqueEntityID';
import { Identifier } from './Identifier';

interface AggregateObjectProps {
  foo: string;
}

class AbstractClass extends AggregateRoot<AggregateObjectProps> {
  constructor(props: AggregateObjectProps, id: UniqueEntityID) {
    super(props, id);
  }
}

describe('AggregateRoot with AbstractClass', () => {
  it('should be defined', () => {
    expect(AbstractClass).toBeDefined();
  });

  it('should return id', () => {
    const tclass = new AbstractClass({ foo: 'bar' }, new UniqueEntityID(1));
    expect(tclass.id).toBeDefined();
    expect(tclass.id.toValue()).toEqual(1);
  });
});
