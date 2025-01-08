import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736341064037 implements MigrationInterface {
  name = 'Migration1736341064037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "idx_crop_name" ON "crop" ("name") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_crop_name"`);
  }
}
