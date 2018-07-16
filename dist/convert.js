'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { has, isArray, isEmpty, size, isObject, isNumber } from 'lodash/fp';
/**
 * 转换金钱/赔率
 *
 * 赔率保留小数点后 3 位
 * 获取数据除 100
 * 发送数据乘 100
 */
var convert = function (fields, result) {
    var hasFields = size(fields) > 0;
    var _a = result.data, data = _a === void 0 ? [] : _a, attributes = result.attributes;
    var divideValue = 100; // 被除数值
    var oddsValue = 3; // 小数点后 3 位
    // 数据为对象数组
    if (hasFields && has('data', result) && isArray(data)) {
        data.map(function (item) {
            // 除 100
            if (has('D100', fields) && !isEmpty(fields.D100)) {
                var divideFields = fields.D100 || [];
                var _loop_1 = function (p) {
                    if (p) {
                        divideFields.map(function (v) {
                            if (v === p) {
                                item[p] = item[p] / divideValue;
                            }
                        });
                    }
                };
                for (var p in item) {
                    _loop_1(p);
                }
            }
            // 赔率
            if (has('odds', fields) && !isEmpty(fields.odds)) {
                var oddsFields = fields.odds || [];
                var _loop_2 = function (p) {
                    if (p) {
                        oddsFields.map(function (v) {
                            if (v === p) {
                                var isNum = isNumber(item[p]);
                                var itemStr = "" + item[p];
                                if (!!itemStr.indexOf('.')) {
                                    var itemOk = itemStr.substring(0, itemStr.indexOf('.') + (oddsValue + 1));
                                    // 还原数据类型
                                    item[p] = isNum ? Number(itemOk) : itemOk;
                                }
                            }
                        });
                    }
                };
                for (var p in item) {
                    _loop_2(p);
                }
            }
        });
    }
    // 小计/总计
    if (hasFields && has('attributes', result) && isObject(attributes)
        && (has('page_sum', attributes) || has('total_sum', attributes))) {
        if (attributes && attributes.page_sum) {
            for (var p in attributes.page_sum) {
                if (p) {
                    attributes.page_sum[p] = attributes.page_sum[p] / divideValue;
                }
            }
        }
        if (attributes && attributes.total_sum) {
            for (var p in attributes.total_sum) {
                if (p) {
                    attributes.total_sum[p] = attributes.total_sum[p] / divideValue;
                }
            }
        }
    }
    return __assign({}, result);
};
/** convert */
export default convert;