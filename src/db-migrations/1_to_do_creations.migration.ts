import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { TO_DO_TABLE } from '../app/to-do/entities/ToDo.entity'

export class ToDoCreation1515769694450 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: TO_DO_TABLE,
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar',
        }
      ]
    }), true)
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TO_DO_TABLE)
  }
}
