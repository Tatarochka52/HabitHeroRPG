import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly email: string;

    @IsNumber()
    readonly birthday: bigint;

    @IsString()
    readonly password: string;
}
