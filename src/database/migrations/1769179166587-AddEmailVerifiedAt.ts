import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerifiedAt1769179166587 implements MigrationInterface {
  name = 'AddEmailVerifiedAt1769179166587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email_verified_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "email_verified_at"`,
    );
  }
}
