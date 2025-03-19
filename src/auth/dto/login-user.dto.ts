import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    example: "test@test.de",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "test123",
  })
  password: string;
}
