import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favGames', (table) => {
    table.increments('id');
    table.integer('gameid').notNullable();
    table.integer('pos');
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favGames');
}
