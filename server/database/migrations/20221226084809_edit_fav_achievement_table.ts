import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('favAchievements', (table) => {
    table.string('icongray');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('favAchievements', (table) => {
    table.dropColumn('icongray');
  });
}
