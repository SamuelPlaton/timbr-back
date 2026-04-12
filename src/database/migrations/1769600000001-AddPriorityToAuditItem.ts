import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriorityToAuditItem1769600000001 implements MigrationInterface {
  name = 'AddPriorityToAuditItem1769600000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit_item" ADD "priority" smallint NOT NULL DEFAULT 5`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "audit_item" DROP COLUMN "priority"`);
  }
}
