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
      created_at: new Date(1977, 4, 25)
    },
    {
      user_id: 1,
      title: 'The Empire Strikes Back',
      content: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.  During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate  eapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the  empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
      created_at: new Date(1980, 4, 21)
    },
    {
      user_id: 1,
      title: 'Return of the Jedi',
      content: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.  During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate  eapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the  empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
      created_at: new Date(1983, 4, 25)
    },
    {
      user_id: 1,
      title: 'The Phantom Menace',
      content: "Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....",
      created_at: new Date(1999, 4, 19)
    },
    {
      user_id: 1,
      title: 'Attack of the Clones',
      content: "There is unrest in the Galactic Senate. Several thousand solar systems have declared their intentions to leave the Republic.\n\nThis separatist movement, under the leadership of the\nmysterious Count Dooku, has made it difficult for the limited\nnumber of Jedi Knights to maintain peace and order in the galaxy.\n\nSenator Amidala, the former Queen of Naboo, is returning to the Galactic Senate to vote on the critical issue of creating an ARMY OF THE REPUBLIC to assist the overwhelmed Jedi....",
      created_at: new Date(2002, 4, 16)
    },
    {
      user_id: 2,
      title: 'The child',
      content: "There I was minding my own business and then I got this job to get this kid. I thought I would just get the money and get out, but I fell in love with this kid. Next thing I know I have the darksaber and my kid is growing up and going off to be with his kind. What a wild ride",
      created_at: new Date()
    }
  ]);
};
