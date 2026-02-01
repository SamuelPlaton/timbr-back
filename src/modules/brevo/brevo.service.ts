import { Injectable, Logger } from '@nestjs/common';
import {
  CreateContact,
  UpdateContact,
  ContactsApi,
  TransactionalEmailsApi,
  SendSmtpEmail,
} from '@getbrevo/brevo';

@Injectable()
export class BrevoService {
  private readonly logger = new Logger(BrevoService.name);
  private apiInstance: ContactsApi;
  private emailApiInstance: TransactionalEmailsApi;

  constructor() {
    this.apiInstance = new ContactsApi();
    this.apiInstance.setApiKey(0, process.env.BREVO_API_KEY);

    this.emailApiInstance = new TransactionalEmailsApi();
    this.emailApiInstance.setApiKey(0, process.env.BREVO_API_KEY);
  }

  async createOrUpdateContact(
    email: string,
    attributes?: Record<string, any>,
  ): Promise<void> {
    try {
      const createContact: CreateContact = {
        email,
        attributes: attributes || {},
        listIds: [2],
        updateEnabled: true,
      };

      await this.apiInstance.createContact(createContact);
    } catch (error) {
      this.logger.error('Error creating/updating Brevo contact:', {
        email,
        error: error.message,
      });
      // Don't throw error to prevent blocking user creation
    }
  }

  async updateContactAttributes(
    email: string,
    attributes: Record<string, any>,
  ): Promise<void> {
    try {
      const updateContact: UpdateContact = {
        attributes,
      };

      await this.apiInstance.updateContact(email, updateContact);
      this.logger.log(`Brevo contact attributes updated: ${email}`, {
        attributes,
      });
    } catch (error) {
      this.logger.error('Error updating Brevo contact attributes:', {
        email,
        attributes,
        error: error.message,
      });
      // Don't throw error to prevent blocking the operation
    }
  }

  async sendTransactionalEmail(
    to: string,
    templateId: number,
    params?: Record<string, any>,
  ): Promise<void> {
    try {
      const sendSmtpEmail: SendSmtpEmail = {
        to: [{ email: to }],
        templateId,
        params: params || {},
      };

      await this.emailApiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      this.logger.error('Error sending transactional email:', {
        to,
        templateId,
        error: error.message,
      });
      // Don't throw error to prevent blocking the operation
    }
  }

  async sendRawEmail(params: {
    to: string;
    from: { email: string; name?: string };
    replyTo?: { email: string; name?: string };
    subject: string;
    htmlContent: string;
  }): Promise<void> {
    try {
      const sendSmtpEmail: SendSmtpEmail = {
        to: [{ email: params.to }],
        sender: params.from,
        replyTo: params.replyTo,
        subject: params.subject,
        htmlContent: params.htmlContent,
      };

      await this.emailApiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      this.logger.error('Error sending raw email:', {
        to: params.to,
        subject: params.subject,
        error: error.message,
      });
      throw error;
    }
  }
}
