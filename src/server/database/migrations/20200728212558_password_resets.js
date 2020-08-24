/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('password_resets', (table) => {
    table.string('email').index();
    table.string('token').notNullable();
    table.timestamp('created_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('password_resets');
};
