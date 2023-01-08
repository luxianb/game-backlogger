/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("id");
    table.integer("appid").notNullable().unique();
    table.string("name").notNullable();

    table.integer("required_age");
    table.boolean("is_free");
    table.string("controller_support");
    table.json("dlc");
    table.text("detailed_description");
    table.text("about_the_game");
    table.text("short_description");
    table.text("supported_languages");
    table.text("reviews");
    table.text("website");
    table.json("pc_requirements");
    table.json("mac_requirements");
    table.json("linux_requirements");
    table.string("legal_notice");
    table.json("developers");
    table.json("publishers");
    table.json("price_overview");
    table.json("packages");
    table.json("package_groups");
    table.json("platforms");
    table.json("categories");
    table.json("genres");
    table.json("screenshots");
    table.json("movies");
    table.json("recommendations");
    table.json("achievements");
    table.json("release_date");
    table.json("support_info");
    table.json("content_descriptors");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
