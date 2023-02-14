export class CreateUserDto {
	readonly username: string;
	readonly email: string;
	readonly birthday: bigint;
	readonly password: string;
}