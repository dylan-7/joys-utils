'use strict';

/**
 * 实用小方法
 * 
 * @version
 * v2.2.0
 * @example
 * toFixeder(0.235, 2) => 0.24
 */
const toFixeder = function(n: number, length: number) {
  var carry = 0; // 存放进位标志
  let num;
  let multiple; // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  let str = n + ''; // 将调用该方法的数字转为字符串
  let dot: number = str.indexOf('.'); // 找到小数点的位置
  if (+str.substring(dot + length + 1, 1) >= 5) {
    carry = 1; // 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
  }
  multiple = Math.pow(10, length); // 设置浮点数要扩大的倍数
  num = Math.floor(n * multiple) + carry; // 去掉舍入位后的所有数，然后加上我们的手动进位数
  var result = num / multiple + ''; // 将进位后的整数再缩小为原浮点数
  dot = result.indexOf('.');
  if (dot < 0) {
    result += '.';
    dot = result.indexOf('.');
  }
  
  // 处理多次进位
  var len = result.length - (dot + 1);
  if (len < length) {
    for (var i = 0; i < length - len; i++) {
      result += 0;
    }
  }
  return result;
};

/** utils */
export default toFixeder;
