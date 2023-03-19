import { Injectable, Redirect, Res } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
    constructor(private sequelize: Sequelize) {}

    /**
     * Redirect to React page
    */
    @Redirect()
    redirectToRest(@Res() res) {
        return res.redirect('http://localhost:8081/');
    };
}
