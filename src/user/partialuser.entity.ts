import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { Entity, BaseEntity } from "typeorm";

@Entity()
export class PartialUser extends BaseEntity {
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

@Entity()
export class LoginUser {
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
