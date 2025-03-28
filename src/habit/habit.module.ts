import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Habit } from "./habit.entity";
import { HabitService } from "./habit.service";
import { HabitController } from "./habit.controller";
import { HabitEntry } from "./habit-entry.entity";
import { Tag } from "../tag/tag.entity";
import { HabitAccess } from "./habit-access.entity";
import { User } from "src/user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Habit, HabitEntry, Tag, HabitAccess, User]),
  ],
  providers: [HabitService],
  controllers: [HabitController],
  exports: [HabitService, TypeOrmModule],
})
export class HabitModule {}
