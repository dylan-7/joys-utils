'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Divide = 100;
var Multiple = 100;
var Odds = 2;
var convert = function (data) {
    var _a;
    if (data === void 0) { data = []; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var plainData = data;
    var dataField = find(function (v) { return has('Data', v); }, rest) ? find(function (v) { return has('Data', v); }, rest)['Data'] : '';
    var plainDataList = !!dataField ? data.data[dataField] : data.data;
    var divideFields = find(function (v) { return has('D', v); }, rest);
    var multiplyFields = find(function (v) { return has('M', v); }, rest);
    var oddsFields = find(function (v) { return has('O', v); }, rest);
    var divide = divideFields && divideFields.D
        ? __assign({}, divideFields, { Multiple: has('Multiple', divideFields) ? divideFields.Multiple : Divide }) : {};
    var multiply = multiplyFields && multiplyFields.M
        ? __assign({}, multiplyFields, { Multiple: has('Multiple', multiplyFields) ? multiplyFields.Multiple : Multiple }) : {};
    var odds = oddsFields && oddsFields.O ? __assign({}, oddsFields, { Float: has('Float', oddsFields) ? oddsFields.Float : Odds }) : {};
    // 乘
    // TODO: 提交为数组
    var multiplier = function (parent) {
        map(function (field) {
            if (has(field, parent) && parent[field] !== '') {
                parent[field] = parent[field] * multiply.Multiple;
            }
        }, multiply.M);
    };
    // 除
    var divider = function (parent) {
        map(function (field) {
            if (parent[field] !== '') {
                parent[field] = parent[field] / divide.Multiple;
            }
        }, divide.D);
    };
    // 列表统计
    function calc(obj) {
        map(function (field) {
            obj[field] = obj[field] / divide.Multiple;
        }, divide.D);
    }
    // 赔率
    var odder = function (parent) {
        map(function (field) {
            var hasValue = parent[field] !== '';
            var dot = ("" + parent[field]).indexOf('.');
            if (hasValue && ("" + parent[field]).includes('/')) {
                var items = split('/', "" + parent[field]);
                map(function (item) {
                    item = item.substring(0, item.indexOf('.') ? item.indexOf('.') + odds.Float + 1 : item);
                }, items);
                parent[field] = join('/', items);
            }
            else if (hasValue && ~dot) {
                parent[field] = ("" + parent[field]).substring(0, (dot + odds.Float) + 1);
            }
            else {
                parent[field] = parent[field];
            }
        }, odds.O);
    };
    try {
        // 提交金额 - 对象
        if (!isEmpty(plainData) && isObject(plainData) && !has('data', plainData)) {
            multiplier(plainData);
        }
        // 列表 - 数组
        // TODO: 数组二级金额
        if (has('data', plainData) && isArray(plainDataList)) {
            map(function (v) {
                divider(v);
                // 获取赔率
                odder(v);
                multiplier(v);
            }, plainDataList);
            // 列表 - 对象
        }
        else if (has('data', plainData) && isPlainObject(plainDataList)) {
            divider(plainDataList);
            odder(plainDataList);
            // 有二级列表
            map(function (field) {
                var hasField = find(function (key) { return (has(key, plainDataList[field][0])); }, divide.D);
                if (isArray(plainDataList[field]) && hasField) {
                    map(function (v) {
                        divider(v);
                    }, plainDataList[field]);
                }
            }, keys(plainDataList));
            // 提交赔率
        }
        else if (!isEmpty(plainData) && !isEmpty(odds)) {
            map(function (field) {
                var current = plainData[field];
                if (current && !current.includes('/')) {
                    var dotIndex = ("" + current).indexOf('.');
                    // 小数点部分
                    var floatNumber_1 = times(constant(0), odds.Float);
                    // 整数部分
                    var intNumber = current;
                    if (~dotIndex) {
                        intNumber = ("" + current).substring(0, dotIndex);
                        Array.from(("" + current).substring(dotIndex + 1)).map(function (v, i) {
                            floatNumber_1[i] = +v;
                        });
                    }
                    // 转数字类型小数点最后的 0 会被忽略
                    plainData[field] = intNumber + "." + floatNumber_1.join('');
                }
                else if (current) {
                    var mulOdds_1 = [];
                    map(function (item) {
                        var dotIndex = ("" + item).indexOf('.');
                        var floatNumber = times(constant(0), odds.Float);
                        var intNumber = item;
                        if (~dotIndex) {
                            intNumber = ("" + item).substring(0, dotIndex);
                            Array.from(("" + item).substring(dotIndex + 1)).map(function (v, i) {
                                floatNumber[i] = +v;
                            });
                        }
                        mulOdds_1.push(intNumber + "." + floatNumber.join(''));
                    }, split('/', current));
                    plainData[field] = join('/', mulOdds_1);
                }
            }, odds.O);
        }
        // 总结
        if (has('total_sum', plainData.attributes)) {
            calc(plainData.attributes.total_sum);
        }
        // 小结
        if (has('page_sum', plainData.attributes)) {
            calc(plainData.attributes.page_sum);
        }
    }
    catch (e) {
        console.info("\uD83D\uDC1E: ", e);
    }
    var dataOk = __assign({}, plainData, { data: plainDataList });
    if (!!size(dataField)) {
        dataOk = __assign({}, plainData, { data: __assign({}, data.data, (_a = {}, _a[dataField] = plainDataList, _a)) });
    }
    var resultOK = plainDataList ? dataOk : __assign({}, plainData);
    return resultOK;
};
/** convert */
export default convert;
/** value */
export { Divide, Multiple, Odds };
