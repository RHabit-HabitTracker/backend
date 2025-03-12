import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { LoginUser } from "src/user/partialuser.entity";
import { UserService } from "src/user/user.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  @ApiOperation({ summary: "Check the credentials for a User" })
  @ApiBody({ type: LoginUser })
  @ApiOkResponse({ description: "Successfull login" })
  @ApiNotFoundResponse({ description: "Invalid Credentials" })
  login(@Body() credentials: LoginUser) {
    return this.userService.login(credentials);
  }
}
