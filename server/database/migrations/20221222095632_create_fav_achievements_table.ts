import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favAchievements', (table) => {
    table.increments('id');
    table.string('gameid').notNullable();
    table.string('achievementid').notNullable();
    table.string('name').notNullable();
    table.string('description');
    table.string('icon').notNullable();
    table.boolean('achieved').notNullable();
    table.integer('pos');
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favAchievements');
}
