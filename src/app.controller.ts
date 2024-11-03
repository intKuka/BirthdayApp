import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listUsers(): Promise<UserEntity[]> {
    return this.appService.listUsers();
  }
}
