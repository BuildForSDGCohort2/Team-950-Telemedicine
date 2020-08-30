/* eslint-disable no-unused-vars */
// import redisCacheMgr from '../cache/cache.manager';
import Observer from './observer';

/**
 * The user observer
 */
export default class UserObserver extends Observer {

  constructor(tableName) {
    super(tableName);
  }

  created(user) {
    this.resetCache(user);
  }

  updated(user) {
    // redisCacheMgr.clear(user.email);
    this.resetCache(user);
  }

  deleted(user) {
    this.resetCache(user);
  }

  resetCache(user) {
    // redisCacheMgr.clear(this.tableName);
    // redisCacheMgr.setExp(user.email, null, user);
  }
}
