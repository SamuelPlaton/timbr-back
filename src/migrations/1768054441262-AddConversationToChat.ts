import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConversationToChat1768054441262 implements MigrationInterface {
  name = 'AddConversationToChat1768054441262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "conversation" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "conversation"`);
  }
}
