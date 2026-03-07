import { MigrationInterface, QueryRunner } from 'typeorm';

export class Audit1768726626891 implements MigrationInterface {
  name = 'Audit1768726626891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."audit_item_type_enum" AS ENUM('danger', 'warning', 'success', 'information')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audit_item_category_enum" AS ENUM('TNS', 'Fiscalité', 'Social', 'Simulation', 'Retraite', 'Démission', 'ARE', 'AGE', 'TVA')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audit_item_status_enum" AS ENUM('liked', 'disliked', 'neutral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."audit_item_type_enum" NOT NULL, "title" character varying(500) NOT NULL, "summary" text NOT NULL, "content" text NOT NULL, "category" "public"."audit_item_category_enum" NOT NULL, "status" "public"."audit_item_status_enum" NOT NULL DEFAULT 'neutral', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "audit_id" uuid, CONSTRAINT "PK_42e876ea796733b87b0ddde2a77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_information" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_1d3d120ddaf7bc9b1ed68ed463a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_item" ADD CONSTRAINT "FK_ed53eff1cc0fa4274cbf4a2c4ab" FOREIGN KEY ("audit_id") REFERENCES "audit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit" ADD CONSTRAINT "FK_c0cfc23f3e46b9aaf5a40254330" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit" DROP CONSTRAINT "FK_c0cfc23f3e46b9aaf5a40254330"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_item" DROP CONSTRAINT "FK_ed53eff1cc0fa4274cbf4a2c4ab"`,
    );
    await queryRunner.query(`DROP TABLE "audit"`);
    await queryRunner.query(`DROP TABLE "audit_item"`);
    await queryRunner.query(`DROP TYPE "public"."audit_item_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."audit_item_category_enum"`);
    await queryRunner.query(`DROP TYPE "public"."audit_item_type_enum"`);
  }
}
