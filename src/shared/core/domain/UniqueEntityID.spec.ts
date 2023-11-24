import { UniqueEntityID } from './UniqueEntityID';

describe('UniqueEntityID', () => {
  it('should be defined', () => {
    const uniqueEntityID = new UniqueEntityID('test');
    const uniqueEntityID2 = new UniqueEntityID(2);
    const uniqueEntityID3 = new UniqueEntityID();

    expect(uniqueEntityID).toBeDefined();
    expect(uniqueEntityID2).toBeDefined();
    expect(uniqueEntityID3).toBeDefined();
  });
});
