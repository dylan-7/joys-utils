'use strict';

import moment from 'moment-timezone';

/**
 * @desc
 * 返回开始/结束时间对象
 * 默认为美东时区，一周开始为星期一
 * 
 * @param
 * start (string) 起始时间名称
 * end (string) 结束时间名称
 * format (string) 时间格式，默认 年-月-日
 * defaultTime (string) 默认时间，today | yesterday | week | month | lastMonth, 默认今日
 * tz: (string) 时区，est | beiJing，默认美东时区
 * 
 * @example
 * periodTime({start: 'start_time', end: 'end_time', format: 'YYYY-MM-DD HH:mm:ss', defaultTime: 'today'})
 */
const periodTime = ({
  start = 'start_date', end = 'end_date', format = 'YYYY-MM-DD', defaultTime = 'today', tz = 'est'
}) => {
  moment.locale('zh');
  let startTime = '';
  let endTime = '';
  if (/(HH|mm|ss)/.test(format)) {
    startTime = ' 00:00:00';
    endTime = ' 23:59:59';
  }
  const privateFormat = 'YYYY-MM-DD';
  const timeZone = tz === 'beiJing' ? moment() : moment().tz('America/Caracas');
  const result = {};

  switch (defaultTime) {
    case 'today':
      result[start] = timeZone.startOf('day').format(privateFormat) + startTime;
      result[end] = timeZone.endOf('day').format(privateFormat) + endTime;
      break;
    case 'yesterday':
      result[start] = timeZone.subtract(1, 'day').startOf('day').format(privateFormat) + startTime;
      result[end] = timeZone.endOf('day').format(privateFormat) + endTime;
      break;
    case 'week':
      result[start] = timeZone.startOf('week').format(privateFormat) + startTime;
      result[end] = timeZone.endOf('week').format(privateFormat) + endTime;
      break;
    case 'month':
      result[start] = timeZone.startOf('month').format(privateFormat) + startTime;
      result[end] = timeZone.endOf('month').format(privateFormat) + endTime;
      break;
    case 'lastMonth':
      result[start] = timeZone.subtract(1, 'month').startOf('month').format(privateFormat) + startTime;
      result[end] = timeZone.endOf('month').format(privateFormat) + endTime;
      break;
    default:
      return {};
  }
  return result;
};

/** periodTime */
export default periodTime;
