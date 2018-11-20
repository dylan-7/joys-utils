'use strict';

import { has, isArray, map, find, keys, isEmpty, isObject, times, constant, isPlainObject, size, join, split } from 'lodash/fp';

/**
 * 转换金额/赔率
 * 
 * @version
 * v2.1.6
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
const Divide: number = 100;
const Multiple: number = 100;
const Odds: number = 2;
const convert = function(data: any = [], ...rest: any[]) {
  const plainData = data
  const dataField = find(v => has('Data', v), rest) ? find(v => has('Data', v), rest)['Data'] : ''
  const plainDataList = !!dataField ? data.data[dataField] : data.data
  const divideFields = find(v => has('D', v), rest)
  const multiplyFields = find(v => has('M', v), rest)
  const oddsFields = find(v => has('O', v), rest);
  const divide = divideFields && divideFields.D 
    ? {...divideFields, Multiple: has('Multiple', divideFields) ? divideFields.Multiple : Divide} : {}
  const multiply = multiplyFields && multiplyFields.M 
    ? {...multiplyFields, Multiple: has('Multiple', multiplyFields) ? multiplyFields.Multiple : Multiple} : {}
  const odds = oddsFields && oddsFields.O ? {...oddsFields, Float: has('Float', oddsFields) ? oddsFields.Float : Odds} : {}
  
  // 乘
  // TODO: 提交为数组
  const multiplier = function(parent: object) {
    map((field: string) => {
      if (has(field, parent) && parent[field] !== '') {
        parent[field] = parent[field] * multiply.Multiple
      }
    },  multiply.M)
  }

  // 除
  const divider = function(parent: object) {
    map((field: string) => {
      if (parent[field] !== '') {
        parent[field] = parent[field] / divide.Multiple
      }
    },  divide.D);
  }

  // 列表统计
  function calc(obj: object) {
    map((field: string) => {
      obj[field] = obj[field] / divide.Multiple;
    },  divide.D)
  }

  // 赔率
  const odder = function(parent: object) {
    map((field: string) => {
      const hasValue: boolean = parent[field] !== '';
      const dot: number = `${parent[field]}`.indexOf('.')
      if (hasValue && `${parent[field]}`.includes('/')) {
        const items: string[] = split('/', `${parent[field]}`);
        map(item => {
          item = item.substring(0, item.indexOf('.') ? item.indexOf('.') + odds.Float + 1 : item)
        },  items)
        parent[field] = join('/', items)
      } else if (hasValue && ~dot) {
        parent[field] = `${parent[field]}`.substring(0, (dot + odds.Float) + 1)
      } else {
        parent[field] = parent[field]

      }
    },  odds.O)
  }

  try {
    // 提交金额 - 对象
    if (!isEmpty(plainData) && isObject(plainData) && !has('data', plainData)) {
      multiplier(plainData)
    }
  
    // 列表 - 数组
    // TODO: 数组二级金额
    if (has('data', plainData) && isArray(plainDataList)) {
      map(v => {
        divider(v)
        // 获取赔率
        odder(v)
        multiplier(v)
      },  plainDataList)
  
    // 列表 - 对象
    } else if (has('data', plainData) && isPlainObject(plainDataList)) {
      divider(plainDataList)
      odder(plainDataList)
  
      // 有二级列表
      map((field: string) => {
        const hasField = find((key: string) => (has(key, plainDataList[field][0])), divide.D)
        if (isArray(plainDataList[field]) && hasField) {
          map(v => {
            divider(v)
          },  plainDataList[field])
        }
      },  keys(plainDataList))
    // 提交赔率
    } else if (!isEmpty(plainData) && !isEmpty(odds)) {
      map((field: string) => {
        let current = plainData[field];
        if (current && !current.includes('/')) {
          const dotIndex = `${current}`.indexOf('.')
          // 小数点部分
          const floatNumber = times(constant(0), odds.Float)
          // 整数部分
          let intNumber = current
          if (~dotIndex) {
            intNumber = `${current}`.substring(0, dotIndex)
            Array.from(`${current}`.substring(dotIndex + 1)).map((v, i) => {
              floatNumber[i] = +v
            })
          }
    
          // 转数字类型小数点最后的 0 会被忽略
          plainData[field] = `${intNumber}.${floatNumber.join('')}`
        } else if (current) {
          const mulOdds: string[] = [];
          map(item => {
            const dotIndex = `${item}`.indexOf('.')
            const floatNumber = times(constant(0), odds.Float)
            let intNumber = item
            if (~dotIndex) {
              intNumber = `${item}`.substring(0, dotIndex)
              Array.from(`${item}`.substring(dotIndex + 1)).map((v, i) => {
                floatNumber[i] = +v
              })
            }
            mulOdds.push(`${intNumber}.${floatNumber.join('')}`);
          },  split('/', current));
          plainData[field] = join('/', mulOdds);
        }
      },  odds.O)
    }
    
    // 总结
    if (has('total_sum', plainData.attributes)) {
      calc(plainData.attributes.total_sum)
    }
    // 小结
    if (has('page_sum', plainData.attributes)) {
      calc(plainData.attributes.page_sum)
    }
  } catch(e) {
    console.info(`🐞: `, e);
  }

  let dataOk = {...plainData, data: plainDataList };
  if (!!size(dataField)) {
    dataOk = {...plainData, data: {...data.data, [dataField]: plainDataList}}
  }

  const resultOK = plainDataList ? dataOk : {...plainData}
  return resultOK;
}
/** convert */
export default convert;
/** value */
export {Divide, Multiple, Odds};
