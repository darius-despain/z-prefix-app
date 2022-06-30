const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del();
  await knex('users').del();
  let password1 = 'helloThere'
   let hashedPW1 = await bcrypt.hash(password1, 10);
  let password2 = 'ilovegrogu'
  let hashedPW2 = await bcrypt.hash(password2, 10);
  await knex('users').insert([
    {first_name: "Obi-Wan", last_name: "Kenobi", username: "benkenobi", password: hashedPW1},
    {first_name: "Din", last_name: "Djarin", username: "mando", password: hashedPW2}
  ]);
};
