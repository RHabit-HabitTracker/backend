import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { HabitAccess } from 'src/habit/habit-access.entity';
import { Habit } from 'src/habit/habit.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @OneToMany(() => Habit, (habit) => habit.owner)
  ownedHabits: Habit[];

  @OneToMany(() => HabitAccess, (access) => access.user)
  habitsAccess: HabitAccess[];
}
