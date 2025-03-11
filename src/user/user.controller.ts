import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, PartialType } from '@nestjs/swagger';
import { PartialUser } from './partialuser.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({description: 'All Users'})
    readAll() {
      return this.userService.readAll();
    }
    
  @Get(':id')
    @ApiOperation({summary: 'Get a user by id'})
    @ApiParam({name: 'id', type: Number})
    @ApiOkResponse({description: 'User', type: User})
    @ApiNotFoundResponse({description: 'User not found'})
      readOne(
        @Param('id') id: number)
        {
          return this.userService.readOne(id);
        }

  @Delete(':id')
    @ApiOperation({summary: 'Delete a user by id'})
    @ApiParam({name: 'id', type: Number})
    @ApiOkResponse({description: 'User successfully deleted'})
    @ApiNotFoundResponse({description: 'User not found'})
      delete(
        @Param('id') id: number)
        {
          return this.userService.delete(id);
        }


  @Post('create')
    @ApiOperation({summary: 'Create a user with email and password'})
    @ApiBody({ type: User })
    @ApiCreatedResponse({ type: User})
    @ApiBadRequestResponse()
      create(
        @Body() newUser: User)
        {
          return this.userService.create(newUser);
        }
  

  @Patch('update/:id')
    @ApiOperation({summary: 'Update userdata by id'})
    @ApiParam({name: 'id', type: Number})
    @ApiBody({ type: PartialUser })
    @ApiBadRequestResponse()
        update(
          @Param('id') id: number,
          @Body() partialUser:PartialUser)
          {
            return this.userService.update(id , partialUser);
          }

}