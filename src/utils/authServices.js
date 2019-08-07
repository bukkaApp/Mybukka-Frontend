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
    return this.getToken() ? this.decode(this.getToken()).data : null;
  }

  getFullName() {
    const tokenData = this.getTokenData();
    return tokenData ? `${tokenData.firstName} ${tokenData.lastName}` : null;
  }

  getEmail() {
    const tokenData = this.getTokenData();
    return tokenData ? tokenData.email : null;
  }

  getUserSlug() {
    const tokenData = this.getTokenData();
    return tokenData ? tokenData.slug : null;
  }

  getUserRole() {
    const tokenData = this.getTokenData();
    return tokenData ? tokenData.role : null;
  }

  getRestaurants() {
    const tokenData = this.getTokenData();
    return tokenData ? tokenData.restaurants : null;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }

  /**
   * @method getCurrentHour
   * @param {*} strFmt string format '10 am' etc or 10
   * @returns {void}
   */
  getCurrentHour(strFmt) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (strFmt) {
      if (currentHour < 12 || currentHour === 0) {
        const is24Hrs = currentHour === 0;
        return `${is24Hrs ? 12 : currentHour} am`;
      }
      const convertTo12Hrs = currentHour - 12;
      const convertedHrs = convertTo12Hrs === 0 ? 12 : convertTo12Hrs;
      return `${convertedHrs} pm`;
    }
    return currentHour === 0 ? 24 : currentHour;
  }

  /**
   * @method getRestaurantWrkHour
   * @description get Restaurant Work Hour
   * @param {*} closingHour string format '10 am' to 10
   * @returns {void}
   */
  getRestaurantWrkHour(closingHour) {
    const dHrs = Number(closingHour.split(' ')[0]);
    const dTimeFmt = closingHour.split(' ')[1];
    if (dHrs < 12 && dTimeFmt === 'am') {
      return dHrs;
    }
    const d24Hrs = dHrs + 12;
    return d24Hrs;
  }
}

export default new AuthService();
