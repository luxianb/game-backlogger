/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("status", (table) => {
    table.increments("id");
    table.string("type").notNullable();
    table.integer("last_appid");
    table.integer("last_completed_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("status");
};
