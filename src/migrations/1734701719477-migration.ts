import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734701719477 implements MigrationInterface {
  name = 'Migration1734701719477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grower" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "full_name" character varying NOT NULL, "document" character varying(14) NOT NULL, CONSTRAINT "UQ_f17c9b533faeb90e84d0f700637" UNIQUE ("document"), CONSTRAINT "PK_e240a1f1703488a179db5568397" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "grower"`);
  }
}
