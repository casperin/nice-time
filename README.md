# Nice Time

A lose implementation of Golang's `Time.format` method.

It's (mostly) a single function to format a date after a given
string that describes what the format should look like, using a specific date: `Mon Jan 2 15:04:05 2006` and `pm` to describe `am/pm`.

The library currently does not care for timezones. Sorry. PRs welcome.

## Examples
```js
var niceTime = require('nice-time')

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
niceTime('On the second day of the month at the fifteenth hour', date)
'On the twentyfirst day of the month at the sixteenth hour'

// You can prepend numbers with 0, _ or nothing for different formats.
niceTime('Hour: "3"', date)
'Hour: "4"'
niceTime('Hour: "03"', date)
'Hour: "04"'
niceTime('Hour: "_3"', date)
'Hour: " 4"'

// You can also add patterns.
niceTime.addPattern({
  pattern: 'MANY SECONDS',
  get: function (d, lang) {
    return d.getTime()
  }
})
niceTime('This is now: MANY SECONDS', date)
This is now: 1498056357000'
```

Notice that the last example takes a `lang` argument. The `lang` argument
contains the object defined in `lang/en.json`, and can be changed at will if
you have your own `lang` file by giving providing it to the format function as
a third parameter:
```js
var da = require('./lang/da.json') // because I created my own
niceTime('Minutes: 4th', date, en)
'Minutes: femogfyrrende' // "fourtyfifth" in Danish
```

