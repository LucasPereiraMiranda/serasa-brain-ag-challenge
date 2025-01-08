import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736343809630 implements MigrationInterface {
  name = 'Migration1736343809630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "typeorm_cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_76af4d1d6fb893fa7e8dd100878" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "typeorm_cache"`);
  }
}
