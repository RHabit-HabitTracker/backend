import { ApiProperty, PartialType } from "@nestjs/swagger";
import { User } from "../../user/user.entity";
import { IsEmail } from "class-validator";

export class LoginUserDto extends PartialType(User) {
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
