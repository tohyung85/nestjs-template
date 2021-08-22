import { MigrationInterface, QueryRunner } from 'typeorm';

export class tempBaseEntityTable1629595310097 implements MigrationInterface {
  name = 'tempBaseEntityTable1629595310097';

  // Base entity table - just for avoiding base table population in migration files. Ok to omit in production
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "base" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "base"`);
  }
}
