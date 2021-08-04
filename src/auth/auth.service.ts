import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity|any> {
    this.logger.debug('validateUser')
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    this.logger.debug('login')
    const payload = { email: user.email, sub: user.id };
    return {
      api_token: this.jwtService.sign(payload)
    }
  }
}
