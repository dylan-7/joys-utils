'use strict';
import moment from 'moment-timezone';
var esClock = function (title) {
    if (title === void 0) { title = ''; }
    var timer;
    window.clearInterval(timer);
    timer = window.setInterval(function () { return (title + "  ( -04:00 )  " + moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')); }, 1000);
    return timer;
};
export default esClock;
