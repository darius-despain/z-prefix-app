const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('users').del();
  let password = '1234'
  let hashedPW = await bcrypt.hash(password, 10);
  await knex('users').insert([
    {first_name: "Obi-Wan", last_name: "Kenobi", username: "benkenobi", password: hashedPW}
  ]);
};
