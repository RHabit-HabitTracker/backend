import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "src/user/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

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
}
