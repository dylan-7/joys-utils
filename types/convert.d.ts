/**
 * 转换金额/赔率
 *
 * @version
 * v2.0.3
 *
 * @author
 * dylan
 *
 * @description
 * 赔率保留小数点后 2 位
 * 获取金额除 100
 * 发送金额乘 100
 *
 * @example
 * convert({D: ['payout'], Multiple: 100}, {M: ['payout'], Multiple: 100}, {O: ['odds], Float: 3})
 */
declare const convert: (data?: any, ...rest: any[]) => any;
/** convert */
export default convert;
