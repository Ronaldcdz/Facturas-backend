import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1777318462213 implements MigrationInterface {
    name = 'InitialStructure1777318462213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provincias" ("id" integer NOT NULL, "nombre" character varying(100) NOT NULL, CONSTRAINT "PK_939ca230524324daa4daf427803" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ciudades" ("id" integer NOT NULL, "nombre" character varying(100) NOT NULL, "provincia_id" integer NOT NULL, CONSTRAINT "UQ_c945b316bb78e50f777b8ef4ffa" UNIQUE ("nombre"), CONSTRAINT "PK_50ef0e3b41f5e7258dfe73840a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "rnc" character varying(15) NOT NULL, "direccion" character varying(100), "ciudad_id" integer, "correo" character varying, "telefono" character varying, CONSTRAINT "UQ_70b582427fe9f776dc7e7ca026c" UNIQUE ("rnc"), CONSTRAINT "UQ_1b10c7d5f7526810e1c70fb9656" UNIQUE ("correo"), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ciudades" ADD CONSTRAINT "FK_f8fde174d0faa2d4d60f79715fa" FOREIGN KEY ("provincia_id") REFERENCES "provincias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_e86bb593df34bbad78bbff23e7d" FOREIGN KEY ("ciudad_id") REFERENCES "ciudades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_e86bb593df34bbad78bbff23e7d"`);
        await queryRunner.query(`ALTER TABLE "ciudades" DROP CONSTRAINT "FK_f8fde174d0faa2d4d60f79715fa"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "ciudades"`);
        await queryRunner.query(`DROP TABLE "provincias"`);
    }

}
