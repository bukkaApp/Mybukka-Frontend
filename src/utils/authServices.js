/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unneeded-ternary */
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {
  tokenKey = 'x-access-token';

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getExpiration(token) {
    const exp = this.decode(token).exp;
    return moment.unix(exp);
  }

  getTokenData() {
    return this.decode(this.getToken()).data;
  }

  getFullName() {
    return `${this.getTokenData().firstName} ${this.getTokenData().lastName}`;
  }

  getUserSlug() {
    return this.getTokenData().slug;
  }

  getUserRole() {
    return this.getTokenData().role;
  }

  getRestaurants() {
    return this.getTokenData().restaurants;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
