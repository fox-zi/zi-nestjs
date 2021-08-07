import { Post, UseGuards, Request, Controller, Get, Logger, Body } from "@nestjs/common";
import { RegisterUserBodyDto, RegisterUserDto } from "dto/user.dto";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller()
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/sign_in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post(RegisterUserDto.url)
  async register(@Body() body: RegisterUserBodyDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
