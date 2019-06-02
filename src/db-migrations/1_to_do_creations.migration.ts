import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class ToDoCreation1515769694450 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'to_do',
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
    await queryRunner.dropTable('to_do');
  }
}