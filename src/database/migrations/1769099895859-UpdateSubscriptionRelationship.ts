import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSubscriptionRelationship1769099895859 implements MigrationInterface {
  name = 'UpdateSubscriptionRelationship1769099895859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "canceled_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "cancel_at_period_end"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "current_period_end"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "current_period_start"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "currency"`,
    );
    await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP COLUMN "stripe_price_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "stripe_subscription_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "UQ_4919f4488c35799176dfd3c143d" UNIQUE ("stripe_subscription_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "REL_cc906b4bc892b048f1b654d2aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "REL_cc906b4bc892b048f1b654d2aa" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "UQ_4919f4488c35799176dfd3c143d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ALTER COLUMN "stripe_subscription_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "stripe_price_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "amount" numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "currency" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "current_period_start" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "current_period_end" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "cancel_at_period_end" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD "canceled_at" TIMESTAMP`,
    );
  }
}
