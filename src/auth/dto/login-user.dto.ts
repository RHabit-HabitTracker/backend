import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    example: "newemail@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Password123",
  })
  password: string;
}
