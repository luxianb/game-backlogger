import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User[]> {
    return this.usersService.find(id);
  }
  @Post()
  createUser(@Body() data: User): Promise<void> {
    return this.usersService.create(data);
  }
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: User): Promise<void> {
    return this.usersService.update(id, data);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
