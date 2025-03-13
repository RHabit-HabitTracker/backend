import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../shared/base";
import { User } from "src/user/user.entity";
import { HabitEntry } from "./habit-entry.entity";
import { Tag } from "../tag/tag.entity";
import { HabitAccess } from "./habit-access.entity";

@Entity()
export class Habit extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.ownedHabits, { cascade: true })
  owner: User;

  @Column()
  isPublic: boolean;

  @Column({ default: 0 })
  streak: number;

  @Column({ default: 0 })
  bestStreak: number;

  @Column({
    type: "text",
    enum: ["daily", "weekly", "monthly"],
  })
  frequency: "daily" | "weekly" | "monthly";

  @Column({ nullable: true, type: "datetime", array: true })
  reminders?: Date[];

  @OneToMany(() => HabitEntry, (entry) => entry.habit, { cascade: true }) // cascade: true automatically adds entries if they were added to the array
  entries: HabitEntry[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => HabitAccess, (access) => access.habit, { cascade: true })
  access: HabitAccess[];
}
