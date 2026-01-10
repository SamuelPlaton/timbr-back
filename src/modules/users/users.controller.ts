import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne({ id: req.user.id });
    const { password_hash, ...result } = user;
    return { data: result };
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@Request() req, @Body() body: { email?: string }) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const updatedUser = await this.usersService.update(user, body);
    const { password_hash, ...result } = updatedUser;
    return { data: result };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    const { password_hash, ...result } = user;
    return { data: result };
  }
}
