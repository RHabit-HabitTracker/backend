import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../shared/base";
import { Habit } from "./habit.entity";

@Entity()
export class HabitEntry extends BaseEntity {
  @ManyToOne(() => Habit, (habit) => habit.entries, { onDelete: "CASCADE" })
  habit: Habit;

  @Column({ type: "datetime" })
  date: Date;

  @Column({ default: false })
  completed: boolean;

  @Column()
  notes: string;
}
