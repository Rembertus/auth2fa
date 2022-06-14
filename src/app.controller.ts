import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('status')
  status(): any {
    return { status: 200, message: 'Servicios ejecutandose!' };
  }
}
