import { Injectable } from '@nestjs/common';
import { BrevoService } from '../brevo/brevo.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class ContactService {
  constructor(private readonly brevoService: BrevoService) {}

  async sendContactEmail(
    user: User,
    subject: string,
    message: string,
  ): Promise<void> {
    const userName =
      [user.first_name, user.last_name].filter(Boolean).join(' ') ||
      'Utilisateur';

    const htmlContent = `
      <h2>Nouveau message de contact</h2>
      <p><strong>De:</strong> ${userName} (${user.email})</p>
      <p><strong>Objet:</strong> ${subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    await this.brevoService.sendRawEmail({
      to: 'bonjour@timbr.fr',
      from: { email: 'noreply@timbr.fr', name: 'Timbr Contact' },
      replyTo: { email: user.email, name: userName },
      subject: `[Contact] ${subject}`,
      htmlContent,
    });
  }
}
