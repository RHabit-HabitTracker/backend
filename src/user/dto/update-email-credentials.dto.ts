import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailCredentialsDto {
  @ApiProperty({
    example: "aktuell@beispiel.de",
    description: "Aktuelle E-Mail-Adresse des Benutzers",
  })
  @IsEmail()
  @IsNotEmpty()
  currentEmail: string;

  @ApiProperty({
    example: "neu@beispiel.de",
    description: "Neue E-Mail-Adresse des Benutzers",
  })
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;

  @ApiProperty({
    example: "Passwort123",
    description: "Passwort zur Bestätigung der Änderung",
  })
  @IsNotEmpty()
  password: string;
} 