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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Habit extends BaseEntity {
  @ApiProperty({
    example: "laufen gehen",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "5km laufen",
  })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.ownedHabits, { cascade: true })
  owner: User;

  @ApiProperty({
    example: "true",
  })
  @Column({ default: false })
  isPublic: boolean;

  @ApiProperty({
    example: "0",
  })
  @Column({ default: 0 })
  streak: number;

  @ApiProperty({
    example: "10",
  })
  @Column({ default: 0 })
  bestStreak: number;

  @ApiProperty({
    example: "weekly",
  })
  @Column({
    type: "text",
    enum: ["daily", "weekly", "monthly"],
  })
  frequency: "daily" | "weekly" | "monthly";

  @Column({ nullable: true, type: "datetime", array: true })
  reminders?: Date[];

  @OneToMany(() => HabitEntry, (entry) => entry.habit, {
    cascade: true,
  })
  entries: HabitEntry[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => HabitAccess, (access) => access.habit, { cascade: true })
  access: HabitAccess[];
}
