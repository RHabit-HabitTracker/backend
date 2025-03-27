import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdatePasswordCredentialsDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "CurrentPassword123",
    description: "Current password of the user",
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    example: "NewPassword456",
    description: "New password of the user",
  })
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  newPassword: string;
} 