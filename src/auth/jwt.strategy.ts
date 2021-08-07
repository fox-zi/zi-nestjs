import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { UserResponseDto } from "dto/user.dto";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('APP_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneId(payload.sub);
    return plainToClass(UserResponseDto, user)
  }
}
