# joys-utils
🛠 utils

# Installation
```
yarn add joys-utils
or
npm i joys-utils
```

# Usage

## periodTime

Return time an object containing the start and end fields.

The default is the East American time zone, which starts on Monday as a week.

```
// returns with hours, minutes and seconds
import { periodTime } from 'joys-utils';
periodTime({
  start: 'start_time',
  end: 'end_time',
  format: 'YYYY-MM-DD HH:mm:ss',
});

=> {start_time: '2018-07-08 08:43:15', end_time: '2018-07-08 08:43:15'}
```

| Property | Description | Type | Default |
| - | - | - | - |
| start | start time name | string | 'start_date'
| end | end time name | string | 'end_date'
| format | time format | string | 'YYYY-MM-DD'
| defaultTime | default initial time | `today` \| `yesterday` \| `week` \| `month` \| `lastMonth` | today
| tz | time zone | `est` \| `beiJing` | est
