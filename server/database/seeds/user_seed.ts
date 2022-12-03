import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 0,
      username: 'Bill',
      email: 'bill@email.com',
      password: 'password',
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
    },
  ]);
}
