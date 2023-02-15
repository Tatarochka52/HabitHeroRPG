import { IsString } from "class-validator";

export class StartAppModificatorDto {
	@IsString()
	mod: string;
}