'use strict';

import { has, isArray, isEmpty, size, isObject, isNumber } from 'lodash/fp';

/**
 * 转换金钱/赔率
 * 
 * 赔率保留小数点后 3 位
 * 获取数据除 100
 * 发送数据乘 100
 */

const convert = function(
  fields: {'D100'?: (string)[], 'M100'?: (string)[], 'odds'?: (string)[]},
  result: Result,
) {
  const hasFields = size(fields) > 0;
  const { data = [], attributes } = result;
  const divideValue = 100;  // 被除数值
  const oddsValue = 3; // 小数点后 3 位

  // 数据为对象数组
  if (hasFields && has('data', result) && isArray(data)) {
    data.map(item => {
      // 除 100
      if (has('D100', fields) && !isEmpty(fields.D100)) {
        const divideFields = fields.D100 || [];
        for (let p in item) {
          if (p) {
            divideFields.map((v: string) => {
              if (v === p) {
                item[p] = item[p] / divideValue;
              }
            });
          }
        }
      }
      // 赔率
      if (has('odds', fields) && !isEmpty(fields.odds)) {
        const oddsFields = fields.odds || [];
        for (let p in item) {
          if (p) {
            oddsFields.map((v: string) => {
              if (v === p) {
                const isNum = isNumber(item[p]);
                const itemStr = `${item[p]}`;
                if (!!itemStr.indexOf('.')) {
                  const itemOk = itemStr.substring(0, itemStr.indexOf('.') + (oddsValue + 1));
                  // 还原数据类型
                  item[p] = isNum ? Number(itemOk) : itemOk;
                }
              }
            });
          }
        }
      } 
    });
  }
  // 小计/总计
  if (hasFields && has('attributes', result) && isObject(attributes)
    && (has('page_sum', attributes) || has('total_sum', attributes))) {
    if (attributes && attributes.page_sum) {
      for (let p in attributes.page_sum) {
        if (p) {
          attributes.page_sum[p] = attributes.page_sum[p] / divideValue;
        }
      }
    }
    if (attributes && attributes.total_sum) {
      for (let p in attributes.total_sum) {
        if (p) {
          attributes.total_sum[p] = attributes.total_sum[p] / divideValue;
        }
      }
    }
  }
  return {...result};
};

/** convert */
export default convert;

interface Result {
  data?: (object)[];
  attributes?: {
    size: number,
    current: number,
    total: number,
    page_sum: {
      bet_times: number, // 投注笔数
      bet_amount: number, // 投注金额
      bet_valid: number, // 有效投注金额
      rebeat: number, // 返点 返现 退水
      win_lose: number, // 输赢    
    },
    total_sum: {
      bet_times: number, // 投注笔数
      bet_amount: number, // 投注金额
      bet_valid: number, // 有效投注金额
      rebeat: number, // 返点 返现 退水
      win_lose: number, // 输赢          
    },
  };
  state?: number;
  message?: string;
}
