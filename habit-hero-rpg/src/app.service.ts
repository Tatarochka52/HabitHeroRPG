import { Injectable, Redirect } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { StartAppModificatorDto } from './dto/start-app.dto';

@Injectable()
export class AppService {
    constructor(private sequelize: Sequelize) {}

    /**
     * SignIn or SignUp to app
     * @param mod string "signup" or "login"
    */
   @Redirect()
    start(startAppModificatorDto?: StartAppModificatorDto) {
        if(startAppModificatorDto) {
            if(startAppModificatorDto.mod == "signup") {
                console.log("ok");
                return { url: '/user/create' };
            } else if(startAppModificatorDto.mod == "login") {
                return { url: '/user/login'};
            }
        } else {
            return 'Start my pet project "HabitHeroRPG"!';
        }
    }
}
