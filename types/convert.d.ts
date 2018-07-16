/**
 * 转换金钱/赔率
 *
 * 赔率保留小数点后 3 位
 * 获取数据除 100
 * 发送数据乘 100
 */
declare const convert: (fields: {
    'D100'?: string[];
    'M100'?: string[];
    'odds'?: string[];
}, result: Result) => {
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
