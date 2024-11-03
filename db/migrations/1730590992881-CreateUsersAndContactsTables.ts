import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndContactsTables1730590992881
  implements MigrationInterface
{
  name = 'CreateUsersAndContactsTables1730590992881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."contacts_type_enum" AS ENUM('phone', 'email', 'social')`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "type" "public"."contacts_type_enum" NOT NULL, "value" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "birthdate" date NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TYPE "public"."contacts_type_enum"`);
  }
}
