import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller("tag")
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: "Get all tags" })
  @ApiOkResponse({
    description: "Return all tags",
    type: [Tag],
  })
  async findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create a new tag" })
  @ApiBody({ type: CreateTagDto })
  @ApiCreatedResponse({
    description: "The tag has been successfully created.",
    type: Tag,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  @Get("search")
  @ApiOperation({ summary: "Search tags by name" })
  @ApiQuery({
    name: "name",
    required: true,
    description: "Tag name to search for",
  })
  @ApiOkResponse({
    description: "Return matching tags",
    type: [Tag],
  })
  async findByName(@Query("name") name: string): Promise<Tag[]> {
    return this.tagService.findByName(name);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a tag by id" })
  @ApiParam({ name: "id", description: "Tag identifier" })
  @ApiOkResponse({
    description: "Return the tag",
    type: Tag,
  })
  @ApiNotFoundResponse({ description: "Tag not found" })
  async findOne(@Param("id") id: string): Promise<Tag> {
    return this.tagService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a tag" })
  @ApiParam({ name: "id", description: "Tag identifier" })
  @ApiBody({ type: UpdateTagDto })
  @ApiOkResponse({
    description: "The tag has been successfully updated.",
    type: Tag,
  })
  @ApiNotFoundResponse({ description: "Tag not found" })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  async update(
    @Param("id") id: string,
    @Body() updateTagDto: UpdateTagDto
  ): Promise<Tag> {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a tag" })
  @ApiParam({ name: "id", description: "Tag identifier" })
  @ApiOkResponse({
    description: "The tag has been successfully deleted.",
  })
  @ApiNotFoundResponse({ description: "Tag not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.tagService.remove(id);
  }
}
