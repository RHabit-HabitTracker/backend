import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Public } from "src/auth/decorators/public.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get("")
  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({ description: "All Users" })
  @ApiUnauthorizedResponse()
  readAll() {
    return this.userService.readAll();
  }

  @ApiBearerAuth()
  @Get(":id")
  @ApiOperation({ summary: "Search user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "User", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse()
  readOne(@Param("id") id: number) {
    return this.userService.readOne(id);
  }

  @Public()
  @Post("")
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: User })
  @ApiCreatedResponse({ description: "User successfully created", type: User })
  @ApiBadRequestResponse({ description: "Bad Request" })
  create(@Body() newUser: User) {
    return this.userService.create(newUser);
  }

  @ApiBearerAuth()
  @Patch(":id")
  @ApiOperation({ summary: "Update a User" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  update(@Param("id") id: number, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @ApiBearerAuth()
  @Delete(":id")
  @ApiOperation({ summary: "Delete a user" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "User successfully deleted" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse()
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
