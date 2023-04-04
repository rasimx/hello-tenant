import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1680556358506 implements MigrationInterface {
    name = 'Init1680556358506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tenants_tenant" ("user_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, CONSTRAINT "PK_d5850ffddf551ac62c842adb256" PRIMARY KEY ("user_id", "tenant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da0536255eaf466042b73e82fb" ON "user_tenants_tenant" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_addccc8087051d43cca8549b09" ON "user_tenants_tenant" ("tenant_id") `);
        await queryRunner.query(`ALTER TABLE "user_tenants_tenant" ADD CONSTRAINT "FK_da0536255eaf466042b73e82fb5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tenants_tenant" ADD CONSTRAINT "FK_addccc8087051d43cca8549b09a" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tenants_tenant" DROP CONSTRAINT "FK_addccc8087051d43cca8549b09a"`);
        await queryRunner.query(`ALTER TABLE "user_tenants_tenant" DROP CONSTRAINT "FK_da0536255eaf466042b73e82fb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_addccc8087051d43cca8549b09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da0536255eaf466042b73e82fb"`);
        await queryRunner.query(`DROP TABLE "user_tenants_tenant"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
