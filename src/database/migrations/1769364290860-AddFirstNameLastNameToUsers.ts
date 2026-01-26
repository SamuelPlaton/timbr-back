import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstNameLastNameToUsers1769364290860 implements MigrationInterface {
  name = 'AddFirstNameLastNameToUsers1769364290860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "first_name" character varying DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "last_name" character varying DEFAULT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
  }
}
