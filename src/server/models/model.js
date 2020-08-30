import knex from '../database';
import Observer from '../observers/observer';

// TODO: add a columnManager to manage fields at runtime

/**
 * This is the only connection to the outside world (knex in this case)
 * Replacement of the existing connection / queryBuilder should not affect
 * the rest of my code.
 */
export default class Model {
  #_connection = knex;
  #tableName;
  #columns;
  #observer;

  /**
   *
   * @param {String} tableName - the name of the table
   * @param {String[]} columns - the fields to return when a resource is created/updated
   * @param {Observer} observer - an observer of the model
   */
  constructor(tableName, columns, observer) {

    if(typeof tableName !== 'string' || !tableName) {
      throw new Error('Please provide a database table name');
    }

    if(!columns || !Array.isArray(columns) || columns.length === 0) {
      throw new Error('Please provide the columns you want to retrieve from a select/create/update clause');
    }

    this.#tableName = tableName;
    this.#columns = columns;

    if(observer){
      if(!(observer instanceof Observer))
        throw new Error("Please provide an observer for this model");
      this.#observer = Object.freeze(observer);
    }
  }

  get connection(){
    return this.#_connection;
  }

  async all() {
    return await this.connection.column(this.#columns)
              .select()
              .from(this.#tableName);
  }

  where(fieldName, fieldValue) {
    return this.connection(this.#tableName).where(fieldName, fieldValue);
  }

  /**
   * Gets the resource from the database
   * @param {string} fieldName
   * @param {*} fieldValue
   */
  async getByField(fieldName, fieldValue) {
    return await this.where(fieldName, fieldValue)
      .first();
  }

  async get(id) {
    return await this.getByField('id', id);
  }

  /**
   * Creates the resource in the database
   * @param {object} data
   */
  async create(data) {
    const res = await this.connection(this.#tableName)
    .on('query-response', (entity) => {
      this.#observer?.created(entity[0]);
    })
    .insert(data)
    .returning(this.#columns);
    return res[0];
  }

  /**
   * Updates the resource in the database
   * @param {object} where
   * @param {object} data
   */
  async update(where, data) {
    const res = await this.connection(this.#tableName)
      .where(where)
      .on('query-response', (entity) => {
        this.#observer?.updated(entity[0]);
      })
      .update(data, this.#columns);
    return res[0];
  }

  /**
   * Deletes the resource from the database
   * @param {number} id
   */
  async destroy(id) {
    const where = this.where("id", id);
    this.#observer?.deleted(await where.first());
    return (await where.del()) > 0;
  }
}
