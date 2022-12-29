import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favAchievementGameLists', (table) => {
    table.increments('id');
    table.string('gameid').notNullable();
    table.string('name').notNullable();
    table.integer('pos');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favAchievementGameLists');
}
