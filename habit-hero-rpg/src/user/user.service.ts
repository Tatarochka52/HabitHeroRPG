import {
    BadRequestException,
    UnauthorizedException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import {
    ALREADY_EXISTS_ERROR,
    USER_NOT_FOUND_ERROR,
    WRONG_PASSWORD_ERROR,
} from './user.constants';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService
    ) {}

    /**
     * Create user and registration service
     * @param createUserDto CreateUserDto
     */
    async registration(createUserDto: CreateUserDto): Promise<User> {
        try {
            const findUser = await this.userModel.findOne({
                where: {
                    email: createUserDto.email,
                },
            });

            if (!findUser) {
                const salt = await genSalt(15);

                const userData = {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    birthday: createUserDto.birthday,
                    password: await hash(createUserDto.password, salt),
                };

                return await this.userModel.create(userData);
            } else {
                throw new BadRequestException(ALREADY_EXISTS_ERROR);
            }
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
            const salt = await genSalt(15);

            if (updateUserDto.password)
            updateUserDto.password = await hash(updateUserDto.password, salt);

            return await this.userModel.update(updateUserDto, {
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Validate user by email and password
     * @param email string
     * @param password string
     */
    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const findUser = await this.userModel.findOne({
            where: {
                email: email,
            },
        });

        if (!findUser) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }

        const isCorrectPaeeword = await compare(password, findUser.password);

        if (!isCorrectPaeeword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }

        return { email: findUser.email };
    }

    /**
     * 
     */
    async login(email: string) {
        const payload = {
            email: email,
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
