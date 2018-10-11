/**
 * 转换金额/赔率
 *
 * @version
 * v2.1.0
 *
 * @author
 * dylan
 *
 * @description
 * attributes 小计/总计 合并到 data列表
 *
 * @example
 * totalToData(
 *    result,
 *    {pageSum: ['bet_amount', 'bet_valid', 'payout', 'win_lose'], title: 'result'},
 *    {totalSum: ['bet_amount', 'bet_valid', 'payout', 'win_lose'], title: 'result'}
 *  )
 */
declare function totalToData(result: any, ...rest: any[]): any;
export default totalToData;
