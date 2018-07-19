'use strict';

import { has, isArray, isEmpty, size, isObject, isNumber, isPlainObject } from 'lodash/fp';

/**
 * 转换金额/赔率
 * 
 * 赔率保留小数点后 3 位
 * 获取金额除 100
 * 发送金额乘 100
 */

const convert = function( fields: Fields, result: Result) {
  const hasFields = size(fields) > 0;
  const { attributes } = result;
  const divideValue = 100;  // 除以数值
  const multiplyValue = 100;  // 乘以数值
  const oddsValue = 3; // 小数点后 3 位

  if (hasFields && (has('data', result) && isArray(result.data) || isPlainObject(result))) {
    const { data = [] } = result;
    // 获取金额
    if (isArray(data)) {
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
        if (has('Odds', fields) && !isEmpty(fields.Odds)) {
          const oddsFields = fields.Odds || [];
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

    // 获取金额
    if (has('D100', fields) && has('data', result) && isPlainObject(result.data) && !isEmpty(result)) {
      // 除 100
      const divideFields = fields.D100 || [];
      for (let p in result) {
        if (p) {
          divideFields.map((v: string) => {
            const isNum = isNumber(result[p]);
            if (v === p) {
              result[p] = isNum ? Number(result[p] / divideValue) : result[p] / divideValue;
            }
          });
        }
      }
    }

    // 获取赔率
    if (has('Odds', fields)  && !isEmpty(fields.Odds) && isPlainObject(result)) {
      const oddsFields = fields.Odds || [];
      for (let p in result) {
        if (p) {
          oddsFields.map((v: string) => {
            if (v === p) {
              const isNum = isNumber(result[p]);
              const itemStr = `${result[p]}`;
              if (!!itemStr.indexOf('.')) {
                const itemOk = itemStr.substring(0, itemStr.indexOf('.') + (oddsValue + 1));
                // 还原数据类型
                result[p] = isNum ? Number(itemOk) : itemOk;
              }
            }
          });
        }
      }
    }

    // 提交金额
    if (has('M100', fields) && isPlainObject(result)) {
      for (let p in result) {
        if (p) {
          const multiplyFields = fields.M100 || [];
          multiplyFields.map((v: string) => {
            if (v === p) {
              const itemNum = Number(result[p]);
              result[p] = isNumber(result[p]) ? Number(itemNum * multiplyValue) : (itemNum * multiplyValue).toString();
            }
          });
        }
      }
    }

    // 提交赔率
    if (has('Odds', fields) && isPlainObject(result)) {
      for (let p in result) {
        if (p) {
          const oddsFields = fields.Odds || [];
          oddsFields.map((v: string) => {
            if (v === p) {
              const isNum = isNumber(result[p]);
              const itemStr = `${result[p]}`;
              if (itemStr.indexOf('.') !== -1) {
                const itemOk = itemStr.substring(0, itemStr.indexOf('.') + (oddsValue + 1));
                // 还原数据类型
                result[p] = isNum ? Number(itemOk) : itemOk;
              }
              if (/\.$/.test(itemStr)) {
                const itemOk = itemStr + '000';
                result[p] = isNum ? Number(itemOk) : itemOk;
              }
            }
          });
        }
      }
    }
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

interface Fields {
  'D100'?: (string)[];  // 除 100
  'M100'?: (string)[];  // 乘 100
  'Odds'?: (string)[];  // 赔率
}

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
