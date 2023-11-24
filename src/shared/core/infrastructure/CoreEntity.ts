import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  uuid: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
