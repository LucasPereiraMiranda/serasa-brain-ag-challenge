import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736210361726 implements MigrationInterface {
  name = 'Migration1736210361726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "harvest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "name" character varying(50) NOT NULL, "year" character varying(4) NOT NULL, "harvest_id" uuid NOT NULL, CONSTRAINT "PK_84a837e6c60baad24c5a4125f67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest" ADD CONSTRAINT "FK_246d631160ff530434f0380a0ec" FOREIGN KEY ("harvest_id") REFERENCES "agricultural_property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest" DROP CONSTRAINT "FK_246d631160ff530434f0380a0ec"`,
    );
    await queryRunner.query(`DROP TABLE "harvest"`);
  }
}
