'use strict';

import moment from 'moment-timezone';
import { isNumber } from 'lodash/fp';

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
 * currentTime: (boolean) 当前时间
 * 
 * @example
 * periodTime({start: 'start_time', end: 'end_time', format: 'YYYY-MM-DD HH:mm:ss', defaultTime: 'today'})
 */
const periodTime = ({
  start = 'start_date', end = 'end_date', format = 'YYYY-MM-DD', defaultTime = 'today', tz = 'est', currentTime = false
}) => {
  moment.locale('zh');

  const timezone = tz === 'beiJing' ? 'beiJing' : 'est';
  let startTime = '';
  let endTime = '';

  if (/(HH|mm|ss)/.test(format) && !currentTime) {
    startTime = ' 00:00:00';
    endTime = ' 23:59:59';
  }
  const privateFormat = format.split(' ')[0];
  
  let timeZone = function() {
    return moment().tz('America/Caracas');
  };

  if (timezone === 'beiJing') {
    timeZone = function() {
      return moment();
    };
  }

  const result = {};

  
  if (isNumber(+defaultTime[0]) && defaultTime.endsWith('day')) {
    result[start] = timeZone().subtract(parseInt(defaultTime, 10) - 1, 'day').startOf('day').format(privateFormat) + startTime;
    result[end] = timeZone().endOf('day').format(privateFormat) + endTime;  
  } else {
    switch (defaultTime) {
      case 'today':
        result[start] = timeZone().startOf('day').format(privateFormat) + startTime;
        result[end] = timeZone().endOf('day').format(privateFormat) + endTime;
        break;
      case 'yesterday':
        result[start] = timeZone().subtract(1, 'day').startOf('day').format(privateFormat) + startTime;
        result[end] = timeZone().subtract(1, 'day').endOf('day').format(privateFormat) + endTime;
        break;
      case 'week':
        result[start] = timeZone().startOf('week').format(privateFormat) + startTime;
        result[end] = timeZone().endOf('week').format(privateFormat) + endTime;
        break;
      case 'month':
        result[start] = timeZone().startOf('month').format(privateFormat) + startTime;
        result[end] = timeZone().endOf('month').format(privateFormat) + endTime;
        break;
      case 'lastMonth':
        result[start] = timeZone().subtract(1, 'month').startOf('month').format(privateFormat) + startTime;
        result[end] = timeZone().subtract(1, 'month').endOf('month').format(privateFormat) + endTime;
        break;
      default:
        return {};
    }
  }

  return result;
};

/** periodTime */
export default periodTime;
