import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('steamProfiles', (table) => {
    table.integer('steam_id').unsigned();
    table
      .foreign('steam_id')
      .references('steamProfiles.id')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('steamProfiles', (table) => {
    table.dropColumn('steam_id');
  });
}
