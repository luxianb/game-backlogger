/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("achievements", (table) => {
    table.increments("id");
    table.integer("appid").notNullable();
    table.integer("pos").notNullable();

    table.string("name");
    table.string("description");
    table.integer("defaultvalue");
    table.string("displayName");
    table.integer("hidden");
    table.string("icon");
    table.string("icongray");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("achievements");
};
