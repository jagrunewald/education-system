/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("students", (table) => {
    table.integer("ra").primary();
    table.string("nome").notNull();
    table.string("email").notNull();
    table.string("cpf").notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("students");
};
