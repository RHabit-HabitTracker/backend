import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../shared/base";
import { Habit } from "./habit.entity";

@Entity()
export class HabitAccess extends BaseEntity {
  @ManyToOne(() => Habit)
  habit: Habit;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: "text",
    enum: ["read", "write", "admin"],
  })
  accessLevel: "read" | "write" | "admin";
}
