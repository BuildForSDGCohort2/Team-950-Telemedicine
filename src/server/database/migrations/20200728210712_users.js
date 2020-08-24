/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('id');
    table.string('name', 100).notNullable();
    table.string('email', 200).unique().notNullable();
    table.string('password', 200).notNullable();
    table.datetime('email_verified_at').nullable();
    table.boolean('is_admin').defaultTo(false);
    table.boolean('is_super_admin').defaultTo(false);
    table.string('token').nullable();
    table.datetime('expires_at', 200).nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
