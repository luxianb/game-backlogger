/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.increments("id");
    table.integer("appid").notNullable().unique();

    table.string("header");
    table.string("logo");
    table.string("library_hero");
    table.string("library_600x900");
    table.string("page_bg_generated_v6b");
    table.string("hero_capsule");
    table.string("portrait");
    table.string("capsule_616x353");
    table.string("capsule_231x87");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
