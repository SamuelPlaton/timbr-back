import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenUsageAndRenameSubscriptions1769500000000 implements MigrationInterface {
  name = 'AddTokenUsageAndRenameSubscriptions1769500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add current_month_token_usage column to user table
    await queryRunner.query(
      `ALTER TABLE "user" ADD "current_month_token_usage" integer NOT NULL DEFAULT 0`,
    );

    // Rename subscription plans
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Solo' WHERE "name" = 'Offer A'`,
    );
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Boost' WHERE "name" = 'Offer B'`,
    );
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Elite' WHERE "name" = 'Offer C'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert subscription plan names
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Offer A' WHERE "name" = 'Solo'`,
    );
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Offer B' WHERE "name" = 'Boost'`,
    );
    await queryRunner.query(
      `UPDATE "subscription" SET "name" = 'Offer C' WHERE "name" = 'Elite'`,
    );

    // Remove current_month_token_usage column
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "current_month_token_usage"`,
    );
  }
}
