import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateTagDto {
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  color?: string;
}
