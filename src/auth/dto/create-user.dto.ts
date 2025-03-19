import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "test@test.de",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "test123",
  })
  passwordHash: string;
}
