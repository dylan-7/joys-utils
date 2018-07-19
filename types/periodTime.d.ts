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
declare const periodTime: ({ start, end, format, defaultTime, tz }: {
    start?: string;
    end?: string;
    format?: string;
    defaultTime?: string;
    tz?: string;
}) => {};
/** periodTime */
export default periodTime;
