import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };
/**
 * Auth service class
 * creates the user on registration
 */
export class FetchService {
  delegate(url, { method = 'POST', body = {}, options = { headers } } = {}) {
    return fetch(url, { method, body, ...options });
  }

  get(url, options = {}) {
    return fetch(url, options);
  }

  post(url, body, options) {
    return this.delegate(url, { body, options });
  }

  put(url, body, options) {
    return this.delegate(url, { method: 'PUT', body, options });
  }

  patch(url, body, options) {
    return this.delegate(url, { method: 'PATCH', body, options });
  }

  delete(url, options) {
    return this.delegate(url, { method: 'DELETE', options });
  }

  head(url, options) {
    return this.delegate(url, { method: 'HEAD', options });
  }
}


/**
 * Auth service class
 * creates the user on registration
 */
class ApiService {

  #http;

  constructor(http) {
    this.#http = http;
  }

  get http() {
    return this.#http;
  }

  get(url, config={}) {
    return this.http.get(url, config);
  }

  post(url, data, options) {
    return this.http.post(url, data, options);
  }

  put(url, data, options) {
    return this.http.put(url, data, options);
  }

  patch(url, data, options) {
    return this.http.patch(url, data, options);
  }

  delete(url, options) {
    return this.http.delete(url, options);
  }

  head(url, options) {
    return this.http.head(url, options);
  }
}

const apiService = new ApiService(axios);
export default apiService;
