import { Post, UseGuards, Request, Controller, Body, Logger } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { SignInUserDto } from "dto/auth.dto";
import { RegisterUserBodyDto, RegisterUserDto } from "dto/user.dto";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { UserEntity } from "src/entities/user.entity";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(SignInUserDto.url)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post(RegisterUserDto.url)
  async register(@Body() body: RegisterUserBodyDto) {
    return this.authService.signUp(body);
  }
}
