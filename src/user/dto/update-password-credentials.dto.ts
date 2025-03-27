import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdatePasswordCredentialsDto {
  @ApiProperty({
    example: "benutzer@beispiel.de",
    description: "E-Mail-Adresse des Benutzers",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "AltesPasswort123",
    description: "Aktuelles Passwort des Benutzers",
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    example: "NeuesPasswort456",
    description: "Neues Passwort des Benutzers",
  })
  @IsNotEmpty()
  @MinLength(6, { message: "Das Passwort muss mindestens 6 Zeichen lang sein." })
  newPassword: string;
} 