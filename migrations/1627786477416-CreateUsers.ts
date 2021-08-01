import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1627786477416 implements MigrationInterface {


  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `gen_random_uuid()`
            },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'first_name',
          type: 'varchar',
        },
        {
          name: 'last_name',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'status',
          type: 'int',
          default: 1,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: true,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: true,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
