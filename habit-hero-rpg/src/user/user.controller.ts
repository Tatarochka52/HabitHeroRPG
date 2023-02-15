import {
    Controller,
    HttpStatus,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Body, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common/decorators";
import { ApiTags } from '@nestjs/swagger';
import * as dto from "./dto/index.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Create user account and registration controller
     * @param createUserDto data to create user
     */
    @UsePipes(new ValidationPipe())
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createAccount(@Body() createUserDto: dto.CreateUserDto) {
        this.userService.registration(createUserDto);
    }

    /**
     * Update user presonal data
     * @param updateUserDto data to update in user
     * @param id user's id
     */
    @Post("update")
    @HttpCode(HttpStatus.OK)
    async updatePersonalData(@Body() updateUserDto: dto.UpdateUserDto, @Query() id: string) {
        this.userService.update(id["id"], updateUserDto);
    }

    /**
     * Authorization user with login and password
     * @param authorizationUserDto data to authorization (login, password)
     */
    @UsePipes(new ValidationPipe())
    @Post("login")
    async authorization(@Body() { login, password }: dto.AuthorizationUserDto) {
        const user = await this.userService.validateUser(login, password);

        return this.userService.login(user.email);
    }

//     @UseGuards(JwtAuthGuard)
//     @Get('test')
//     async CheckJwt() {
//         return "ok";
//     }
}
