import { Post, UseGuards, Request, Controller, Get } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/sign_in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
