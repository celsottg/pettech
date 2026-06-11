import type { MigrationInterface, QueryRunner } from "typeorm";

export class ProductAutoGenerateUUID1781220902242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE product ALTER COLUMN id SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE product ALTER COLUMN id DROP DEFAULT`);
    }

}
