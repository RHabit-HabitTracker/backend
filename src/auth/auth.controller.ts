import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "src/user/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateEmailCredentialsDto } from "src/user/dto/update-email-credentials.dto";
import { UpdatePasswordCredentialsDto } from "src/user/dto/update-password-credentials.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/login")
  @ApiOperation({ summary: "Check the credentials for a User" })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ description: "Successfull login" })
  @ApiNotFoundResponse({ description: "Invalid Credentials" })
  async login(@Body() credentials: LoginUserDto) {
    return await this.authService.login(credentials);
  }

  @Public()
  @Post("/register")
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({ description: "User successfully created", type: User })
  @ApiBadRequestResponse({ description: "Bad Request" })
  async create(@Body() newUser: LoginUserDto) {
    return await this.authService.register(newUser);
  }

  @UseGuards(AuthGuard)
  @Put("/update-email")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update email address of user" })
  @ApiBody({ type: UpdateEmailCredentialsDto })
  @ApiOkResponse({ description: "Email successfully updated" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Invalid request or email already in use" })
  async updateEmail(@Body() updateEmailDto: UpdateEmailCredentialsDto) {
    return await this.authService.updateEmail(updateEmailDto);
  }

  @UseGuards(AuthGuard)
  @Put("/update-password")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update password of user" })
  @ApiBody({ type: UpdatePasswordCredentialsDto })
  @ApiOkResponse({ description: "Password successfully updated" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Invalid request or invalid current password" })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordCredentialsDto) {
    return await this.authService.updatePassword(updatePasswordDto);
  }
}
