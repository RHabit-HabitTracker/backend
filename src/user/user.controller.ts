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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  PartialType,
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
  readAll() {
    return this.userService.readAll();
  }

  @ApiBearerAuth()
  @Get(":id")
  @ApiOperation({ summary: "Get a user by id" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "User", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  readOne(@Param("id") id: number) {
    return this.userService.readOne(id);
  }

  @ApiBearerAuth()
  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by id" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "User successfully deleted" })
  @ApiNotFoundResponse({ description: "User not found" })
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }

  @Public()
  @Post("")
  @ApiOperation({ summary: "Create a user with email and password" })
  @ApiBody({ type: User })
  @ApiCreatedResponse({ description: "User successfully created", type: User })
  @ApiBadRequestResponse({ description: "Bad Request" })
  create(@Body() newUser: User) {
    return this.userService.create(newUser);
  }

  @ApiBearerAuth()
  @Patch(":id")
  @ApiOperation({ summary: "Update userdata by id" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiBadRequestResponse()
  update(@Param("id") id: number, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }
}
