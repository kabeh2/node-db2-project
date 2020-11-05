const { table } = require('../../node-db1-project/data/dbConfig');

exports.up = function (knex) {
  return knex.schema.createTable('cars', (table) => {
    table.increments();
    table.integer('vin').notNullable();
    table.text('make', 250).notNullable();
    table.text('model', 250).notNullable();
    table.integer('mileage').notNullable();
    table.text('type', 250);
    table.text('status', 250);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
