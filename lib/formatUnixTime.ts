import moment from 'moment';

const formatUnixTime = function(t: number|string) {
  if (moment.unix(+t).isValid()) {
    return moment.unix(+t).format('HH:mm:ss');
  } else {
    const time: number = +t;
    let hour: number = 0o0;
    let minutes: number = 0o0;
    let seconds: number = 0o0;
    if (+time > 60) {
      minutes = parseInt(`${time / 60}`, 10);
      seconds = parseInt(`${time % 60}`, 10);
      if (minutes > 60) {
        hour = parseInt(`${minutes / 60}`, 10);
        minutes = parseInt(`${minutes % 60}`, 10);
      }
    } else if (+time < 60) {
      seconds = parseInt(`${time}`, 10);
    }
    if (hour >= 24) {
      return `${hour}:${moment(`1970-01-01 00:${minutes}:${seconds}`).format('mm:ss')}`;
    } else {
      return moment(`1970-01-01 ${hour}:${minutes}:${seconds}`).format('HH:mm:ss');
    }
  }
}

/**
 * format unit timestamp
 */
export default formatUnixTime;
