import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { UsersModule } from '../users/users.module';
import { BrevoModule } from '../brevo/brevo.module';

@Module({
  imports: [UsersModule, BrevoModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
