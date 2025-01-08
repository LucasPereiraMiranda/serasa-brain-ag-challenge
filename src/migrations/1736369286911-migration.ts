import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736369286911 implements MigrationInterface {
    name = 'Migration1736369286911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_246d631160ff530434f0380a0ec"`);
        await queryRunner.query(`ALTER TABLE "harvest" RENAME COLUMN "harvest_id" TO "agricultural_property_id"`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_95308fdd7e5d65bce65a6d9fc2d" FOREIGN KEY ("agricultural_property_id") REFERENCES "agricultural_property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvest" DROP CONSTRAINT "FK_95308fdd7e5d65bce65a6d9fc2d"`);
        await queryRunner.query(`ALTER TABLE "harvest" RENAME COLUMN "agricultural_property_id" TO "harvest_id"`);
        await queryRunner.query(`ALTER TABLE "harvest" ADD CONSTRAINT "FK_246d631160ff530434f0380a0ec" FOREIGN KEY ("harvest_id") REFERENCES "agricultural_property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
