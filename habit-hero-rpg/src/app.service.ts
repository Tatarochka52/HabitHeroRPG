import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Start my pet project "HabitHeroRPG"!';
  }
}
