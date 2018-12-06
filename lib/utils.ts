'use strict';

import { gte } from 'lodash/fp';

/**
 * 实用小方法
 * 
 * @version
 * v2.2.0

 * @example
 * toFixeder(0.235, 2) => 0.24
 */
const toFixeder = function(num: number, n: number) {
  let symbol: number = 1
  if (gte(num, 0)) {
    // 符号为负
    symbol = -1
    num *= -1
  }
  const num2: string = (
    Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1))).toString().slice(0, -1)
  return parseFloat(`${+num2 * symbol}`).toFixed(n)
};

/** utils */
export default toFixeder;
