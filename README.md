# Nice Time

A lose implementation of Golang's `Time.format` method.

It's (mostly) a single function to format a date after a given
string that describes what the format should look like, using a specific date: `Mon Jan 2 15:04:05 2006` and `pm` to describe `am/pm`.

The library currently does not care for timezones. Sorry. PRs welcome.

## Examples
```js
var date = new Date('2017-06-21 16:45:57')
date.toString()
'Wed Jun 21 2017 16:45:57 GMT+0200 (CEST)'

// Simple date
niceTime('Mon Jan 2 15:04:05 2006', date)
'Wed Jun 21 16:45:57 2017'

// For the people across the pond
niceTime('Mon Jan 2 3:04pm 2006', date)
'Wed Jun 21 4:45pm 2017'

// Formatting <3
nt('On the second day of the month at the fifteenth hour', date)
'On the twentyfirst day of the month at the sixteenth hour'
```

