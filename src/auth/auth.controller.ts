import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("")
  @ApiOperation({ summary: "Check the credentials for a User" })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ description: "Successfull login" })
  @ApiNotFoundResponse({ description: "Invalid Credentials" })
  login(@Body() credentials: LoginUserDto) {
    return this.authService.login(credentials);
  }
}
