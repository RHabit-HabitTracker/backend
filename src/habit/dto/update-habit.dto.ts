import { IsString, IsOptional, IsArray } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Habit } from "../habit.entity";

// PartialType makes all properties from CreateHabitDto optional
export class UpdateHabitDto extends PartialType(Habit) {
  // You can override or add additional properties specific to updates if needed

  @ApiPropertyOptional({
    description: "Last completed date",
    example: "2023-04-15",
  })
  @IsString()
  @IsOptional()
  lastCompletedDate?: string;
}
