/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unneeded-ternary */

class TimeEngine {
  verifiedPhone = 'verizon';

  createVerificationDetail() {
    return {
      date: this.getDate(),
      month: this.getMonth(),
      year: this.getFullYear(),
      hours: this.getCurrentHour()
    };
  }

  getDate = () => {
    const today = new Date();
    return today.getDate();
  };

  getMonth = () => {
    const today = new Date();
    const currentMonth = today.getUTCMonth() + 1;
    return currentMonth === 13 ? 1 : currentMonth;
  };

  getFullYear = () => {
    const today = new Date();
    return today.getFullYear();
  };

  comparedMonth = (prevMonth) => {
    const currentMonth = this.getMonth();
    if (prevMonth <= currentMonth
        || (currentMonth === 1 && prevMonth > currentMonth)) {
      return true;
    }
  }

  comparedDay = (prevDay) => {
    const currentDay = this.getDate();
    if (prevDay < currentDay) {
      return true;
    } else if (currentDay === 1 && prevDay > currentDay) {
      return true;
    }
  }

  getPhoneVerificationToken = () => localStorage.getItem(this.verifiedPhone)

  phoneVerificationWarning = () => {
    if (!this.getPhoneVerificationToken()) {
      return true;
    } else if (this.comparedDay(this.getPhoneVerificationToken())) {
      return true;
    }
  }

  resetPhoneVericationPrompt = () => localStorage
    .removeItem(this.verifiedPhone);

  autoPromptForPhoneNumbVerification = () => {
    if (!this.phoneVerificationWarning()) {
      localStorage.setItem(
        this.verifiedPhone,
        JSON.stringify(this.getDate())
      );
    }
  }

  stopVerificationWarning = () => localStorage
    .setItem(this.verifiedPhone, JSON.stringify(this.getDate()));

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
   * @method getWorkHour
   * @description get Restaurant Work Hour
   * @param {*} closingHour string format '10 am' to 10
   * @returns {void}
   */
  getWorkHour(closingHour) {
    const dHrs = Number(closingHour.split(' ')[0]);
    const dTimeFmt = closingHour.split(' ')[1];
    if (dHrs < 12 && dTimeFmt === 'am') {
      return dHrs;
    }
    const d24Hrs = dHrs + 12;
    return d24Hrs;
  }
}

export default new TimeEngine();
