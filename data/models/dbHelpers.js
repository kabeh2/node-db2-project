const db = require('../dbConfig');

const add = async (car) => {
  const [id] = await db('cars').insert(car);
  console.log(id);
  return id;
};

const find = async () => {
  return await db('cars');
};

const findById = async (id) => {
  const [accountId] = await db('cars').where({ id });
  return accountId;
};

const update = async (id, values) => {
  const response = await db('cars')
    .where({ id })
    .update(values)
    .then(() => findById(id));

  return response;
};

const remove = async (id) => {
  const response = await db('cars').where({ id }).delete();
  return response;
};

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
};
