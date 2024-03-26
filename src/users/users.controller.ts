import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpadetUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() //  /users
  findAll(@Query('role') role?: 'INTERNS' | 'ADMIN' | 'ENGINEER') {
    return this.userService.findAll(role);
  }

  @Get(':id') // /users/:id  /* should be under the static route  if there any params*/
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post() // /users
  createUsers(
    @Body(ValidationPipe)
    createUserDto: CreateUserDTO,
  ) {
    return this.userService.createUsers(createUserDto);
  }

  @Patch(':id') // /users:id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpadetUserDTO,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id') // /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
