import { IsString, IsNotEmpty, IsArray, IsDate } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Tag } from "src/tag/tag.entity";

export class CreateHabitDto {
  @ApiProperty({
    description: "The name of the habit",
    example: "Daily Exercise",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: "A description of the habit",
    example: "Do 30 minutes of physical activity every day",
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Tags associated with this habit",
    example: ["health", "fitness"],
    type: [Tag],
  })
  @IsArray()
  tags?: Tag[];

  // Add other fields as needed based on your Habit entity
  // For example:
  @ApiProperty({
    description: "How often the habit should be performed",
    example: "daily",
  })
  @IsString()
  frequency: string;

  @ApiPropertyOptional({
    example: "2025-04-25 00:00:00",
  })
  startDate?: Date;
}
