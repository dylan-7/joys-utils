'use strict';

import moment from 'moment-timezone';

const esClock = (title) => {
  return (
    `<span>${title} ( -04:00 ) ${moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')}</span>`
  );
};

export default esClock;
