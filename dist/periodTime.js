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
 *
 * @example
 * periodTime({start: 'start_time', end: 'end_time', format: 'YYYY-MM-DD HH:mm:ss', defaultTime: 'today'})
 */
var periodTime = function (_a) {
    var _b = _a.start, start = _b === void 0 ? 'start_date' : _b, _c = _a.end, end = _c === void 0 ? 'end_date' : _c, _d = _a.format, format = _d === void 0 ? 'YYYY-MM-DD' : _d, _e = _a.defaultTime, defaultTime = _e === void 0 ? 'today' : _e, _f = _a.tz, tz = _f === void 0 ? 'est' : _f;
    moment.locale('zh');
    var timezone = tz === 'beiJing' ? 'beiJing' : 'est';
    var startTime = '';
    var endTime = '';
    if (/(HH|mm|ss)/.test(format)) {
        startTime = ' 00:00:00';
        endTime = ' 23:59:59';
    }
    var privateFormat = format;
    var timeZone = function () {
        return moment().tz('America/Caracas');
    };
    if (timezone === 'beiJing') {
        timeZone = function () {
            return moment();
        };
    }
    var result = {};
    if (isNumber(+defaultTime[0]) && defaultTime.endsWith('day')) {
        result[start] = timeZone().subtract(parseInt(defaultTime, 10) - 1, 'day').startOf('day').format(privateFormat) + startTime;
        result[end] = timeZone().endOf('day').format(privateFormat) + endTime;
    }
    else {
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
