/**
 * @class TimeService
 */
class TimeService {
  /**
   * @method getDay
   * @example
   * // 7 days in a week => determine a day in a week
   * utc days start from monday => 0, tuesday => 1, sunday => 6
   * // counting from sunday to saturday
   * convert to sunday => 0, saturday => 6
   * @returns {number} number
   */
  static getDay = () => {
    const day = new Date().getDay() + 1;
    if (day === 7) return 0;
    return day;
  };

  /**
   * @method getTime
   * @param {*} fmt string format '10:00 pm', without format '22:00'
   * @abstract
   * utc 24 hours will be 0:00, then format to 12:00 am
   * @example
   * getTime(12) // 12 hours format
   * getTime() // 24 hours format
   * @returns {void}
   */
  static getTime(fmt) {
    const newDate = new Date();
    const hours = newDate.getHours();
    const min = newDate.getMinutes();

    if (!fmt) return `${hours}:${min !== 0 ? min : '00'}`;

    const isMorning = hours < 12 || hours === 0;
    if (isMorning) {
      const in12Hours = hours === 0;
      return `${in12Hours ? 12 : hours}:${min !== 0 ? min : '00'} am`;
    }

    const in12Hours = hours - 12;
    const derivedHours = in12Hours === 0 ? 12 : in12Hours;
    return `${derivedHours}:${min !== 0 ? min : '00'} pm`;
  }

  /**
   * @method convert
   * @param {*} time format 9:00 pm => 19, 9:02 am => 9.02 etc
   * @returns {void}
   */
  static convert(time) {
    const newTime = time.replace(/[a-z]/gi, '').split(':'); // ["19", "02 "]

    const hours = Number(newTime[0]);
    const min = Number(`0.${newTime[1].replace(' ', '')}`); // 1 => 0.01

    const fmt = time.split(' ')[1];

    const isMorning = hours <= 12 || fmt === 'am';
    if (isMorning) {
      return hours + min;
    }

    const in24Hours = hours + 12;
    return in24Hours + min;
  }
}

export default TimeService;

