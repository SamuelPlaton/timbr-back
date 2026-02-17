import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Subscription } from '../../entities';
import { UsersApi } from './users.api';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenUsageService } from './token-usage.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscription]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersApi, UsersService, TokenUsageService],
  controllers: [UsersController],
  exports: [UsersApi, UsersService, TokenUsageService],
})
export class UsersModule {}
