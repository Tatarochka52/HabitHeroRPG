import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || '',
      host: process.env.DB_HOST || '',
      port: parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
