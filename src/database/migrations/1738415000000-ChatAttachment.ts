import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatAttachment1738415000000 implements MigrationInterface {
  name = 'ChatAttachment1738415000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying(255) NOT NULL, "original_name" character varying(255) NOT NULL, "mime_type" character varying(100) NOT NULL, "size" integer NOT NULL, "path" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "message_id" uuid, CONSTRAINT "PK_chat_attachment_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_chat_attachment_message_id" ON "chat_attachment" ("message_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_chat_attachment_created_at" ON "chat_attachment" ("created_at")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_chat_attachment_message_created" ON "chat_attachment" ("message_id", "created_at")`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_attachment" ADD CONSTRAINT "FK_chat_attachment_message" FOREIGN KEY ("message_id") REFERENCES "chat_message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_attachment" DROP CONSTRAINT "FK_chat_attachment_message"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_chat_attachment_message_created"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_chat_attachment_created_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_chat_attachment_message_id"`,
    );
    await queryRunner.query(`DROP TABLE "chat_attachment"`);
  }
}
