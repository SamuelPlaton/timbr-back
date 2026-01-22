import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscription1769097952647 implements MigrationInterface {
  name = 'AddSubscription1769097952647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_status_enum" AS ENUM('active', 'canceled', 'past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" "public"."subscription_status_enum" NOT NULL, "stripe_subscription_id" character varying, "stripe_price_id" character varying, "amount" numeric(10,2), "currency" character varying, "current_period_start" TIMESTAMP, "current_period_end" TIMESTAMP, "cancel_at_period_end" boolean, "canceled_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_cc906b4bc892b048f1b654d2aa" UNIQUE ("userId"), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "stripe_customer_id" character varying`,
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
      `ALTER TABLE "user" DROP COLUMN "stripe_customer_id"`,
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
  }
}
