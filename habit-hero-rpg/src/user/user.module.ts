import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
	imports: [
		SequelizeModule.forFeature([User]),
		JwtModule.register({
			secret: process.env.JWT_SECRET
		})],
	exports: [SequelizeModule],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
