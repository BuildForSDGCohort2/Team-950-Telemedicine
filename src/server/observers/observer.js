/* eslint-disable no-unused-vars */

export default class Observer {
  #tableName;

  constructor(tableName) {
    this.#tableName = tableName;
  }

  get tableName(){
    return this.#tableName;
  }

  created(entity) {
    throw new Error('Not implemented error');
  }

  updated(entity) {
    throw new Error('Not implemented error');
  }

  deleted(entity) {
    throw new Error('Not implemented error');
  }

}
