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
function totalToData(result) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var pageSum = find(function (v) { return has('pageSum', v); }, rest) || {};
    var totalSum = find(function (v) { return has('totalSum', v); }, rest) || {};
    if (!isEmpty(result.data)) {
        var rowKey = keys(result.data[0]);
        try {
            var pageSumTitle_1 = has('title', pageSum) ? pageSum.title : rowKey[0];
            pageSumTitle_1 = eq(pageSumTitle_1, 'id') ? rowKey[1] : pageSumTitle_1;
            var pageRow_1 = cloneDeep(result.data[0]);
            var pageSumAttr_1 = has('page_sum', result.attributes) ? result.attributes.page_sum : {};
            map(function (v) {
                if (size(filter(function (field) { return eq(v, field); }, pageSum.pageSum))) {
                    pageRow_1[v] = pageSumAttr_1[v] || '';
                }
                else if (eq(pageSumTitle_1, v)) {
                    pageRow_1[v] = '小计';
                }
                else {
                    pageRow_1[v] = '';
                }
            }, keys(pageRow_1));
            var totalSumTitle_1 = has('title', totalSum) ? totalSum.title : rowKey[0];
            totalSumTitle_1 = eq(totalSumTitle_1, 'id') ? rowKey[1] : totalSumTitle_1;
            var totalRow_1 = cloneDeep(result.data[0]);
            var totalSumAttr_1 = has('total_sum', result.attributes) ? result.attributes.total_sum : {};
            map(function (v) {
                if (size(filter(function (field) { return eq(v, field); }, totalSum.totalSum))) {
                    totalRow_1[v] = totalSumAttr_1[v] || '';
                }
                else if (eq(totalSumTitle_1, v)) {
                    totalRow_1[v] = '总计';
                }
                else {
                    totalRow_1[v] = '';
                }
            }, keys(totalRow_1));
            return __assign({}, result, { data: result.data.concat(pageRow_1, totalRow_1) });
        }
        catch (err) {
            console.info("\uD83D\uDC1E: ", err);
        }
    }
    else {
        return result;
    }
}
export default totalToData;
