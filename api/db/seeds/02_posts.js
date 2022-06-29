/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('posts').insert([
    {
      user_id: 1,
      title: 'A New Hope',
      content: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.  During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate  eapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the  empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
      created_at: new Date(1977, 5, 25)
    }
  ]);
};
