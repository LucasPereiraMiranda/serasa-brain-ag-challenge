import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736259156594 implements MigrationInterface {
  name = 'Migration1736259156594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "harvest_to_crop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "harvest_id" uuid NOT NULL, "crop_id" uuid NOT NULL, CONSTRAINT "UQ_4fabd7e8fe5ab1c0e0e5c35422c" UNIQUE ("harvest_id", "crop_id"), CONSTRAINT "PK_8ed5fa8604723af80bafa6620a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_to_crop" ADD CONSTRAINT "FK_31f846d3aefae2ac92628a9653d" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_to_crop" ADD CONSTRAINT "FK_f4b05189d6db88d948d91cb6df9" FOREIGN KEY ("crop_id") REFERENCES "crop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_to_crop" DROP CONSTRAINT "FK_f4b05189d6db88d948d91cb6df9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_to_crop" DROP CONSTRAINT "FK_31f846d3aefae2ac92628a9653d"`,
    );
    await queryRunner.query(`DROP TABLE "harvest_to_crop"`);
  }
}
