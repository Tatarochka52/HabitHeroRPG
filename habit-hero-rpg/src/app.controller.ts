import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { StartAppModificatorDto } from './dto/start-app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * SignIn or SignUp to app
   * @param mod string 
  */
  @Get()
  start(@Query() startAppModificatorDto?: StartAppModificatorDto) {
    return this.appService.start(startAppModificatorDto);
  }
}
