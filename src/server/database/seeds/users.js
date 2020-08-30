const passwordManager = require('../../util/password.manager');

async function createUsers() {
  const password = await passwordManager.hash('password');

  const users = [
    {
      id: 1,
      name: 'Burger King',
      email: 'bk@example.com',
      password,
      is_admin: true,
    },
    {
      id: 2,
      name: 'Pizza Guy',
      email: 'pg@example.com',
      password,
      is_admin: false,
    },
    {
      id: 3,
      name: 'Tea man',
      email: 'tm@example.com',
      password,
      is_admin: false,
    },
  ];

  return users;
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert(await createUsers());
};
