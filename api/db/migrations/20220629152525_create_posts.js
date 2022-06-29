/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.string('title', 250);
    table.string('content', 1000);
    table.integer('user_id')
    table.foreign('user_id').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('posts', table => {
    table.dropForeign('user_id')
  })
  .then(function () {
    return knex.schema.dropTableIfExists('posts')
  })
};
