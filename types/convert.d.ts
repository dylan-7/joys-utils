/**
 * 转换金额/赔率
 *
 * @param
 * bet_times (number)  投注笔数
 * bet_amount (number) 投注金额
 * bet_valid (number) 有效投注金额
 * rebeat (number) 返点 返现 退水
 * win_lose (number) 输赢
 *
 * 赔率保留小数点后 3 位
 * 获取金额除 100
 * 发送金额乘 100
 */
declare const convert: (fields: Fields, result: Result) => {
    data?: object[];
    attributes?: {
        size: number;
        current: number;
        total: number;
        page_sum: {
            bet_times: number;
            bet_amount: number;
            bet_valid: number;
            rebeat: number;
            win_lose: number;
        };
        total_sum: {
            bet_times: number;
            bet_amount: number;
            bet_valid: number;
            rebeat: number;
            win_lose: number;
        };
    };
    state?: number;
    message?: string;
};
/** convert */
export default convert;
interface Fields {
    'D100'?: (string)[];
    'M100'?: (string)[];
    'Odds'?: (string)[];
}
interface Result {
    data?: (object)[];
    attributes?: {
        size: number;
        current: number;
        total: number;
        page_sum: {
            bet_times: number;
            bet_amount: number;
            bet_valid: number;
            rebeat: number;
            win_lose: number;
        };
        total_sum: {
            bet_times: number;
            bet_amount: number;
            bet_valid: number;
            rebeat: number;
            win_lose: number;
        };
    };
    state?: number;
    message?: string;
}
