import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './strategies/jwt.strategy';
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
		}),
		PassportModule
	],
	exports: [SequelizeModule],
	providers: [UserService, JwtStrategy],
	controllers: [UserController]
})
export class UserModule {}
