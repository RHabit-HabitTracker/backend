import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailCredentialsDto {
  @ApiProperty({
    example: "current@example.com",
    description: "Current email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  currentEmail: string;

  @ApiProperty({
    example: "new@example.com",
    description: "New email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;

  @ApiProperty({
    example: "Password123",
    description: "Password for verification of the change",
  })
  @IsNotEmpty()
  password: string;
} 