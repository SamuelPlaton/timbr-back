import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditSource1768728960466 implements MigrationInterface {
  name = 'AuditSource1768728960466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_item" ADD "sources" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_item" DROP COLUMN "sources"`);
  }
}
