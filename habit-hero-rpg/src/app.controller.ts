import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Redirect to React start page
  */
  @Get()
  start(@Res() res) {
    return this.appService.redirectToRest(res);
  }
}
