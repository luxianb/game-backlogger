import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('fruits').del();

  // Inserts seed entries
  await knex('fruits').insert([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Strawberry' },
    { id: 3, name: 'Pear' },
  ]);
}
