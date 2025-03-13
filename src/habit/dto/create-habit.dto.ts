import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateHabitDto {
  @ApiProperty({
    description: "The name of the habit",
    example: "Daily Exercise",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: "A description of the habit",
    example: "Do 30 minutes of physical activity every day",
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Tags associated with this habit",
    example: ["health", "fitness"],
    type: [String],
  })
  @IsArray()
  tags?: string[];

  // Add other fields as needed based on your Habit entity
  // For example:
  @ApiPropertyOptional({
    description: "How often the habit should be performed",
    example: "daily",
  })
  @IsString()
  frequency?: string;
}
