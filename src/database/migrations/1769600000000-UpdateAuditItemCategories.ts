import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAuditItemCategories1769600000000 implements MigrationInterface {
  name = 'UpdateAuditItemCategories1769600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop the enum constraint by casting column to varchar
    await queryRunner.query(
      `ALTER TABLE "audit_item" ALTER COLUMN "category" TYPE varchar USING "category"::text`,
    );

    // 2. Drop the old enum type
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."audit_item_category_enum"`,
    );

    // 3. Convert existing values to the new ones
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'fiscalite' WHERE "category" IN ('Fiscalité', 'Simulation')`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'tva' WHERE "category" = 'TVA'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'optimisation' WHERE "category" IN ('Retraite')`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'aides' WHERE "category" IN ('TNS', 'Démission', 'ARE', 'AGE')`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'services' WHERE "category" = 'Social' AND "title" LIKE '%RC Pro%'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'autre' WHERE "category" = 'Social' AND "title" LIKE '%CPF%'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'optimisation' WHERE "category" = 'Social' AND ("title" LIKE '%dividendes%' OR "title" LIKE '%rémunération%' OR "title" LIKE '%Optimisation%')`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'aides' WHERE "category" = 'Social' AND "title" LIKE '%ACRE%'`,
    );
    // Catch-all for remaining Social items
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'fiscalite' WHERE "category" = 'Social'`,
    );

    // 4. Create the new enum type and cast the column back
    await queryRunner.query(
      `CREATE TYPE "public"."audit_item_category_enum" AS ENUM('tva', 'fiscalite', 'optimisation', 'aides', 'services', 'autre')`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_item" ALTER COLUMN "category" TYPE "public"."audit_item_category_enum" USING "category"::"public"."audit_item_category_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Cast to varchar
    await queryRunner.query(
      `ALTER TABLE "audit_item" ALTER COLUMN "category" TYPE varchar USING "category"::text`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."audit_item_category_enum"`,
    );

    // 2. Convert back (best effort)
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'Fiscalité' WHERE "category" = 'fiscalite'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'TVA' WHERE "category" = 'tva'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'Retraite' WHERE "category" = 'optimisation'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'ARE' WHERE "category" = 'aides'`,
    );
    await queryRunner.query(
      `UPDATE "audit_item" SET "category" = 'Social' WHERE "category" IN ('services', 'autre')`,
    );

    // 3. Recreate old enum and cast back
    await queryRunner.query(
      `CREATE TYPE "public"."audit_item_category_enum" AS ENUM('TNS', 'Fiscalité', 'Social', 'Simulation', 'Retraite', 'Démission', 'ARE', 'AGE', 'TVA')`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_item" ALTER COLUMN "category" TYPE "public"."audit_item_category_enum" USING "category"::"public"."audit_item_category_enum"`,
    );
  }
}
