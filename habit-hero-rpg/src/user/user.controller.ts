import {
  Controller,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Body,
  Param,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create user account and registration controller
   * @param createUserDto data to create user
   */
  @UsePipes(new ValidationPipe())
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createAccount(@Body() createUserDto: CreateUserDto) {
    this.userService.registration(createUserDto);
  }

  /**
   * Update user presonal data
   * @param updateUserDto data to update in user
   * @param id user's id
   */
  @Post('update')
  @HttpCode(HttpStatus.OK)
  updatePersonalData(
    @Body() updateUserDto: UpdateUserDto,
    @Query() id: string,
  ) {
    this.userService.update(id['id'], updateUserDto);
  }
}
