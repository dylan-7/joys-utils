'use strict';

import { has, cloneDeep, isEmpty, map, filter, eq, find, keys, size } from 'lodash/fp';


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
function totalToData(result: any, ...rest ) {
  const pageSum = find(v => has('pageSum', v), rest) || {};
  const totalSum = find(v => has('totalSum', v), rest) || {};
  
  if (!isEmpty(result.data) ) {
    const rowKey = keys(result.data[0]);
    try {
      let pageSumTitle = has('title', pageSum) ? pageSum.title : rowKey[0];
      pageSumTitle = eq(pageSumTitle, 'id') ? rowKey[1] : pageSumTitle;
      const pageRow = cloneDeep(result.data[0]);
      const pageSumAttr = has('page_sum', result.attributes) ? result.attributes.page_sum : {};
      map(v => {
        if (size(filter(field => eq(v, field), pageSum.pageSum))) {
          pageRow[v] = pageSumAttr[v];
        } else if (eq(pageSumTitle, v)) {
          pageRow[v] = '小计';
        } else {
          pageRow[v] = '';
        }
      },  keys(pageRow));
  
      let totalSumTitle = has('title', totalSum) ? totalSum.title : rowKey[0];
      totalSumTitle = eq(totalSumTitle, 'id') ? rowKey[1] : totalSumTitle;
      const totalRow = cloneDeep(result.data[0]);
      const totalSumAttr = has('total_sum', result.attributes) ? result.attributes.total_sum : {};
      map(v => {
        if (size(filter(field => eq(v, field), totalSum.totalSum))) {
          totalRow[v] = totalSumAttr[v];
        } else if (eq(totalSumTitle, v)) {
          totalRow[v] = '总计';
        } else {
          totalRow[v] = '';
        }
      },  keys(totalRow));
      return {...result, data: [...result.data, ...pageRow, ...totalRow]};
    } catch (err) {
      console.info(`🐞: `, err);
    }
  } else {
    return result;
  }
}

export default totalToData;
