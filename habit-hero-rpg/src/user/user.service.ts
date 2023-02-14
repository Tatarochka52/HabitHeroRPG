import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { genSaltSync, hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  /**
   * Create user and registration service
   * @param createUserDto CreateUserDto
   */
  async registration(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = genSaltSync(15);

      const userData = {
        username: createUserDto.username,
        email: createUserDto.email,
        birthday: createUserDto.birthday,
        password: hashSync(createUserDto.password, salt),
      };

      return await this.userModel.create(userData);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Update user personal data
   * @param id string
   * @param updateUserDto UpdateUserDto
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<[number]> {
    try {
      const salt = genSaltSync(15);

      if (updateUserDto.password)
        updateUserDto.password = hashSync(updateUserDto.password, salt);

      return await this.userModel.update(updateUserDto, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
