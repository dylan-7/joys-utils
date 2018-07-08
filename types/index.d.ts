export = Utils;
export as namespace joysUtils;

declare namespace Utils {
  interface PeriodTime {
    start?: string;
    end?: string;
    format?: string;
    defaultTime?: 'today' | 'yesterday' | 'week' | 'month' | 'lastMonth';
    tz?: 'est' | 'beiJin';
  }

  function periodTime(PeriodTime): object;
}
