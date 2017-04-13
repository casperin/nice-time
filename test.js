var tape = require('tape')
var niceTime = require('.')

tape('Year', function (t) {
  var d = new Date('2017-04-13 21:54')
  var a = niceTime('2006-06', d)
  var e = '2017-17'
  t.equal(a, e, 'Should show year')
  t.end()
})

tape('Weekday', function (t) {
  var d = new Date('2017-04-13 21:54')
  var a = niceTime('Monday-Mon', d)
  var e = 'Thursday-Thu'
  t.equal(a, e, 'Should show weekdays')
  t.end()
})

tape('Month', function (t) {
  var d = new Date('2017-04-13 21:54')
  var a = niceTime('January-Jan-1-01-_1-1st', d)
  var e = 'April-Apr-4-04- 4-4th'
  t.equal(a, e, 'Should show month')
  t.end()
})

tape('Date', function (t) {
  var d = new Date('2017-04-09 21:54')
  var a = niceTime('second-2-02-_2-2nd', d)
  var e = 'ninth-9-09- 9-9th'
  t.equal(a, e, 'Should show date')
  t.end()
})

tape('Hour', function (t) {
  var d = new Date('2017-04-09 21:54')
  var a = niceTime('third-3-03-_3-3rd', d)
  var e = 'ninth-9-09- 9-9th'
  t.equal(a, e, 'Should show hour')

  var d = new Date('2017-04-09 21:54')
  var a = niceTime('fifteenth-15-15-15-15th', d)
  var e = 'twentyfirst-21-21-21-21st'
  t.equal(a, e, 'Should show hour')

  var d = new Date('2017-04-09 21:54')
  var a = niceTime('pm', d)
  var e = 'pm'
  t.equal(a, e, 'Should show am/pm')

  var d = new Date('2017-04-09 3:54')
  var a = niceTime('pm', d)
  var e = 'am'
  t.equal(a, e, 'Should show am/pm')

  t.end()
})

tape('Minute', function (t) {
  var d = new Date('2017-04-09 21:07')
  var a = niceTime('fourth-4-04-_4-4th', d)
  var e = 'seventh-7-07- 7-7th'
  t.equal(a, e, 'Should show minute')
  t.end()
})

tape('second', function (t) {
  var d = new Date('2017-04-09 21:07:34')
  var a = niceTime('fifth-5-05-_5-5th', d)
  var e = 'thirtyfourth-34-34-34-34th'
  t.equal(a, e, 'Should show second')
  t.end()
})

tape('Mixed 1', function (t) {
  var d = new Date('2517-12-03 16:47:29')
  var a = niceTime('Year: 2006, January 2nd at 3:4pm', d)
  var e = 'Year: 2517, December 3rd at 4:47pm'
  t.equal(a, e, 'Should show mixed 1')
  t.end()
})

tape('Add pattern', function (t) {
  niceTime.addPattern({
    pattern: 'XX',
    get: function (d, lang) {
      return 'foo'
    }
  })
  var d = new Date('2517-12-03 16:47:29')
  var a = niceTime('JanuaryXX5', d)
  var e = 'Decemberfoo29'
  t.equal(a, e, 'Should handle .addPattern()')
  t.end()
})
