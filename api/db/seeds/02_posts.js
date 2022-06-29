/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('posts').insert([
    {user_id: 1, title: 'Hello There', content: 'General Kenobi.'}
  ]);
};
