import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async listUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: { contacts: true },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleBirthdayWishesDistribution() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const users = await this.usersRepository.find({
      where: { birthdate: today },
    });

    if (users.length) {
      this.logger.log(
        'Sending birthday wishes to ' + users.length + ' users today',
      );
      console.log(users);
    } else {
      this.logger.log('No users to send wishes today');
    }
  }
}
