import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    example: "test@test.de",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "currentPassword123",
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: "newPassword123",
    required: false,
  })
  @IsString()
  @IsOptional()
  newPassword?: string;
} 