import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('favGames', (table) => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('favGames', (table) => {
    table.dropColumn('user_id');
  });
}
