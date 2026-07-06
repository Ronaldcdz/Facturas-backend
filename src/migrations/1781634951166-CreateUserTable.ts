import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1781634951166 implements MigrationInterface {
    name = 'CreateUserTable1781634951166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "correo" character varying, "contrasenia" character varying NOT NULL, "rol" integer NOT NULL, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "fechaActualizado" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
