import { MigrationInterface, QueryRunner } from 'typeorm';

export class StoreConversation1768054637115 implements MigrationInterface {
  name = 'StoreConversation1768054637115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "conversation" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "conversation"`);
  }
}
