import { UseGuards, Request, Controller, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller()
export class UsersController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
