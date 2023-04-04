import { MigrationInterface, QueryRunner } from "typeorm";

export class Article1680620383116 implements MigrationInterface {
    name = 'Article1680620383116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_44b915ba570031cb54ac5e8d22b" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_44b915ba570031cb54ac5e8d22b"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
