/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('users').del();
  await knex('users').insert([
    {first_name: "Obi-Wan", last_name: "Kenobi", username: "benkenobi", password: "1234"}
  ]);
};
