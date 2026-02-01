import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SendContactDto } from './contact.dto';

@Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async sendContact(@Request() req, @Body() body: SendContactDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });

    await this.contactService.sendContactEmail(
      user,
      body.subject,
      body.message,
    );

    return { data: { success: true } };
  }
}
