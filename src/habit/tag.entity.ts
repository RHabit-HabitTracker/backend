import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column()
  color: string;
}
