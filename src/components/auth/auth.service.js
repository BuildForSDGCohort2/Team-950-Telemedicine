import apiService from "../api.service";


/**
 * Auth service class
 * creates the user on registration
 */
export default class AuthService {

  #baseUrl = 'http://localhost:9000/api/v1/auth'

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * @param {Object} user
   * @returns {} registered user
   */
  register(data) {
    const url = `${this.#baseUrl}/signup`;
    return apiService.post(url, data);
  }

  async login(userData) {
    const url = `${this.#baseUrl}/signin`;
    return apiService.post(url, userData);
  }

  storeToken(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  }
}
