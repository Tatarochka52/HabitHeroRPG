import { IsString, IsNumber, ValidateIf } from 'class-validator';
export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly email: string;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    readonly birthday?: bigint | null;

    @IsString()
    readonly password: string;
}
