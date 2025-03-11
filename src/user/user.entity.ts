import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { HabitAccess } from 'src/habit/habit-access.entity';
import { Habit } from 'src/habit/habit.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {

  @ApiProperty({
    example: 'example@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;


  @ApiProperty({
    example: 'PasswordHash123',
  })
  @IsNotEmpty()
  @Column()
  passwordHash: string;


  @ApiPropertyOptional({
    example: 'user',
  })
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
