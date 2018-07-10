'use strict';

import moment from 'moment-timezone';

const esClock = (title = '') => {
  let timer;
  window.clearInterval(timer);
  timer = window.setInterval(() => (
    `${title}  ( -04:00 )  ${moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')}`
  ), 1000);

  return timer;
};

export default esClock;
