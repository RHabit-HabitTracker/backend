import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { HabitService } from "./habit.service";
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Habit } from "./habit.entity";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";

@Controller("habit")
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  @ApiOperation({ summary: "Get all habits" })
  @ApiOkResponse({
    description: "Returns all habits",
    type: [Habit],
  })
  async findAll(@CurrentUser("sub") userId: number): Promise<Habit[]> {
    return this.habitService.readAll(userId);
  }

  @Post()
  @ApiOperation({ summary: "Create a new habit" })
  @ApiBody({ type: CreateHabitDto })
  @ApiCreatedResponse({
    description: "The habit has been successfully created.",
    type: Habit,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  async create(
    @Body() createHabitDto: CreateHabitDto,
    @CurrentUser("sub") userId: number
  ): Promise<Habit> {
    const habit = new Habit();
    Object.assign(habit, createHabitDto);
    return await this.habitService.create(userId, habit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a habit by ID" })
  @ApiParam({ name: "id", description: "The ID of the habit" })
  @ApiOkResponse({
    description: "Returns the habit with the specified ID",
    type: Habit,
  })
  @ApiNotFoundResponse({ description: "Habit not found" })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Habit> {
    const habit = await this.habitService.readOne(id);
    if (!habit) {
      throw new Error("Habit not found");
    }
    return habit;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a habit" })
  @ApiParam({ name: "id", description: "The ID of the habit to update" })
  @ApiBody({ type: UpdateHabitDto })
  @ApiOkResponse({ description: "The habit has been successfully updated." })
  @ApiNotFoundResponse({ description: "Habit not found" })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateHabitDto: UpdateHabitDto
  ): Promise<any> {
    return this.habitService.update(id, updateHabitDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a habit" })
  @ApiParam({ name: "id", description: "The ID of the habit to delete" })
  @ApiNoContentResponse({
    description: "The habit has been successfully deleted.",
  })
  @ApiNotFoundResponse({ description: "Habit not found" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.habitService.delete(id);
  }
}
