import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RegisterUserBodyDto } from 'dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: { "email": email }
    });
  }

  async create(userParams: RegisterUserBodyDto): Promise<UserEntity | undefined> {
    const user = plainToClass(UserEntity, userParams);
    return await this.userRepo.save(user);
  }
}
