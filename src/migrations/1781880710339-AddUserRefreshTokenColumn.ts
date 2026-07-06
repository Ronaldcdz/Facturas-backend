import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRefreshTokenColumn1781880710339 implements MigrationInterface {
    name = 'AddUserRefreshTokenColumn1781880710339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "hashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "hashedRefreshToken"`);
    }

}
