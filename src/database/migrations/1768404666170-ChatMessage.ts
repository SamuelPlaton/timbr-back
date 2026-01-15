import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatMessage1768404666170 implements MigrationInterface {
  name = 'ChatMessage1768404666170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying(20) NOT NULL, "content" text NOT NULL, "token_cost" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "chat_id" uuid, CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_634db173c52edece8dd88ea3d4" ON "chat_message" ("chat_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6427f26cb5278ff792500e581b" ON "chat_message" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3971fd46bade8e5f70a6edc5cd" ON "chat_message" ("chat_id", "created_at") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "conversation"`);
    await queryRunner.query(
      `ALTER TABLE "chat_message" ADD CONSTRAINT "FK_634db173c52edece8dd88ea3d4c" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_message" DROP CONSTRAINT "FK_634db173c52edece8dd88ea3d4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3971fd46bade8e5f70a6edc5cd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6427f26cb5278ff792500e581b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_634db173c52edece8dd88ea3d4"`,
    );
    await queryRunner.query(`DROP TABLE "chat_message"`);
  }
}
