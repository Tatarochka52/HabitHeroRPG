import { IsString } from 'class-validator';

export class AuthorizationUserDto {
    @IsString()
    readonly login: string;

    @IsString()
    readonly password: string;
}
