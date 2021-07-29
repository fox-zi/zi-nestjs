import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
