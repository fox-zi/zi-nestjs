import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RegisterUserBodyDto } from 'dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private config: ConfigService,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  ) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: { "email": email }
    });
  }

  async findOneId(id: string): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: { "id": id }
    });
  }

  async create(userParams: RegisterUserBodyDto): Promise<UserEntity | undefined> {
    const user = plainToClass(UserEntity, userParams);
    user.password = await bcrypt.hash(user.password, parseInt(this.config.get('SALT_OR_ROUNDS')));
    return await this.userRepo.save(user);
  }
}
