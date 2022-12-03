import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('steamProfiles', (table) => {
    table.increments('id');
    table.string('identifier').notNullable();
    table.string('displayName').notNullable();
    table.string('profilePicture');
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('steamProfiles');
}
