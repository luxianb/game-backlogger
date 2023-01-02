/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.integer("appid").notNullable();
    table.string("name").notNullable();
    table.integer("last_modified").notNullable();
    table.integer("price_change_number").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
