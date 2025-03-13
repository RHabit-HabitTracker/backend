import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: "newemail@example.com",
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: "NewPasswordHash123",
  })
  @IsOptional()
  passwordHash?: string;

  @ApiPropertyOptional({
    example: "admin",
  })
  @IsOptional()
  role?: "user" | "admin";
}
