import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736212154695 implements MigrationInterface {
  name = 'Migration1736212154695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "crop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_3b0092fe001d72938594cb32bd2" UNIQUE ("name"), CONSTRAINT "PK_f306910b05e2d54ed972a536a12" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "crop"`);
  }
}
