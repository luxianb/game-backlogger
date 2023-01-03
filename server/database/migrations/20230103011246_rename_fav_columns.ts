import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('favAchievements', (table) => {
    table.renameColumn('gameid', 'appid');
    table.renameColumn('achievementid', 'apiname');
  });
  await knex.schema.alterTable('favAchievementGameLists', (table) => {
    table.renameColumn('gameid', 'appid');
  });
  await knex.schema.alterTable('favGames', (table) => {
    table.renameColumn('gameid', 'appid');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('favAchievements', (table) => {
    table.renameColumn('appid', 'gameid');
    table.renameColumn('apiname', 'achievementid');
  });
  await knex.schema.alterTable('favAchievementGameLists', (table) => {
    table.renameColumn('appid', 'gameid');
  });
  await knex.schema.alterTable('favGames', (table) => {
    table.renameColumn('appid', 'gameid');
  });
}
