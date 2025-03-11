import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { isEmpty } from 'class-validator';
import { ApiBody, ApiParam, PartialType } from '@nestjs/swagger';
import { PartialUser } from './partialuser.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
    readAll() {
      return this.userService.readAll();
    }
    
  @Get(':id')
  @ApiParam({name: 'id', type: Number})
    readOne(
      @Param('id') id: number)
      {
        return this.userService.readOne(id);
      }

  @Delete(':id')
  @ApiParam({name: 'id', type: Number})
    delete(
      @Param('id') id: number)
      {
        return this.userService.delete(id);
      }

  @Post('create')
  @ApiBody({ type: User })  
    create(
      @Body() newUser: User)
      {
        return this.userService.create(newUser);
      }
  

  @Patch(':id/update')
  @ApiParam({name: 'id', type: Number})
  @ApiBody({ type: PartialUser })
      update(
        @Param('id') id: number,
        @Body() partialUser:PartialUser)
        {
          return this.userService.update(id , partialUser);
        }

}