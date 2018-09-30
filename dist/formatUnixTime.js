import moment from 'moment';
var formatUnixTime = function (t) {
    var time = +t;
    var hour = 0;
    var minutes = 0;
    var seconds = 0;
    if (+time > 60) {
        minutes = parseInt("" + time / 60, 10);
        seconds = parseInt("" + time % 60, 10);
        if (minutes > 60) {
            hour = parseInt("" + minutes / 60, 10);
            minutes = parseInt("" + minutes % 60, 10);
        }
    }
    else if (+time < 60) {
        seconds = parseInt("" + time, 10);
    }
    if (hour >= 24) {
        return hour + ":" + moment("1970-01-01 00:" + minutes + ":" + seconds).format('mm:ss');
    }
    else {
        return moment("1970-01-01 " + hour + ":" + minutes + ":" + seconds).format('HH:mm:ss');
    }
};
/**
 * format unit timestamp
 */
export default formatUnixTime;
