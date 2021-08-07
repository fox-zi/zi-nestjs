import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserBodyDto } from 'dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { AuthResponSeDto } from 'dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity|any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<any> {
    const token = await this.generationJwt(user);
    return plainToClass(AuthResponSeDto, { user: user, api_token: token })
  }

  async signUp(userParams: RegisterUserBodyDto): Promise<any> {
    const user = await this.usersService.create(userParams)
    const token = await this.generationJwt(user);

    return plainToClass(AuthResponSeDto, { user: user, api_token: token })
  }

  private async generationJwt(user: UserEntity): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.sign(payload)
  }
}
