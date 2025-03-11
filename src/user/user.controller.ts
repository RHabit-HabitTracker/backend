import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
    readAll() {
      return this.userService.readAll();
    }
    
  @Get(':id')
    readOne(
      @Param('id') id: number)
      {
        return this.userService.readOne(id);
      }

  @Delete(':id')
    delete(
      @Param('id') id: number)
      {
        return this.userService.delete(id);
      }

  @Post('create')
    create(
      @Body() newUser: User)
      {
        return this.userService.create(newUser);
      }
}
