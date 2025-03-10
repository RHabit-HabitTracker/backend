import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Habit } from './habit.entity';

@Entity()
export class HabitEntry extends BaseEntity {
  @ManyToOne(() => HabitEntry)
  habit: Habit[];

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ default: false })
  completed: boolean;

  @Column()
  notes: string;
}
