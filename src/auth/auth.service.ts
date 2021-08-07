import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserBodyDto } from 'dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity|any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<any> {
    return {
      api_token: await this.generationJwt(user)
    }
  }

  async signUp(userParams: RegisterUserBodyDto): Promise<any> {
    const user = await this.usersService.create(userParams)
    const token = await this.generationJwt(user);
    return {...user, ...{ api_token: token }}
  }

  private async generationJwt(user: UserEntity): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.sign(payload)
  }
}
