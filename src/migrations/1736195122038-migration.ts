import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736195122038 implements MigrationInterface {
    name = 'Migration1736195122038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agricultural_property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "name" character varying NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(2) NOT NULL, "total_area" numeric(10,3) NOT NULL, "arable_area" numeric(10,3) NOT NULL, "vegetation_area" numeric(10,3) NOT NULL, "grower_id" uuid NOT NULL, CONSTRAINT "PK_34dd2709e29407429364706d522" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agricultural_property" ADD CONSTRAINT "FK_bcc0a8b28f161ec979c4604a1f3" FOREIGN KEY ("grower_id") REFERENCES "grower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agricultural_property" DROP CONSTRAINT "FK_bcc0a8b28f161ec979c4604a1f3"`);
        await queryRunner.query(`DROP TABLE "agricultural_property"`);
    }

}
