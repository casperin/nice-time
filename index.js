'use strict'

var en = require('./lang/en.json')

module.exports = niceTime

niceTime.REFERENCE = 'Mon Jan 2 15:04:05 2006'

niceTime.addPattern = function (p) {
  var i = 0
  var len = p.pattern.length
  if (!len) throw new Error('Pattern should be a non-empty string')
  for (; i < patterns.length; i++) {
    if (len >= patterns[i].pattern.length) {
      break
    }
  }
  patterns = patterns.slice(0, i).concat(p).concat(patterns.slice(i))
}

function niceTime (format, date, lang) {
  if (arguments.length === 1) {
    return function (date, lang) {
      return niceTime(format, date, lang)
    }
  }
  lang = lang || en
  date = new Date(date)
  return applyFormat(lang, format, date)
}

function applyFormat (lang, format, d) {
  var out = ''

  next:
  while (format) {
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i].pattern
      if (!pattern.length || format.substr(0, pattern.length) !== pattern) continue

      out += patterns[i].get(d, lang)
      format = format.substr(pattern.length)
      continue next
    }

    out += format.substr(0, 1)
    format = format.substr(1)
  }

  return out
}

function pad (n, padding) {
  return n < 10 ? padding + n : n
}

var patterns = [
  {
    pattern: 'fifteenth',
    get: function (d, lang) {
      return lang.nth[d.getHours() - 1]
    }
  },
  {
    pattern: 'January',
    get: function (d, lang) {
      return lang.month[d.getMonth()]
    }
  }, {
    pattern: 'second',
    get: function (d, lang) {
      return lang.nth[d.getDate() - 1]
    }
  }, {
    pattern: 'Monday',
    get: function (d, lang) {
      return lang.weekday[d.getDay()]
    }
  }, {
    pattern: 'fourth',
    get: function (d, lang) {
      return lang.nth[d.getMinutes() - 1]
    }
  }, {
    pattern: 'third',
    get: function (d, lang) {
      var h = d.getHours()
      return lang.nth[h > 12 ? h - 13 : h - 1]
    }
  }, {
    pattern: 'fifth',
    get: function (d, lang) {
      return lang.nth[d.getSeconds() - 1]
    }
  }, {
    pattern: '2006',
    get: function (d) {
      return d.getFullYear()
    }
  }, {
    pattern: '15th',
    get: function (d, lang) {
      return lang.nthShort[d.getHours() - 1]
    }
  }, {
    pattern: 'Mon',
    get: function (d, lang) {
      return lang.weekdayShort[d.getDay()]
    }
  }, {
    pattern: 'Jan',
    get: function (d, lang) {
      return lang.monthShort[d.getMonth()]
    }
  }, {
    pattern: '1st',
    get: function (d, lang) {
      return lang.nthShort[d.getMonth()]
    }
  }, {
    pattern: '2nd',
    get: function (d, lang) {
      return lang.nthShort[d.getDate() - 1]
    }
  }, {
    pattern: '3rd',
    get: function (d, lang) {
      var h = d.getHours()
      return lang.nthShort[h > 12 ? h - 13 : h - 1]
    }
  }, {
    pattern: '06',
    get: function (d) {
      return d.getFullYear().toString().substr(2)
    }
  }, {
    pattern: 'pm',
    get: function (d) {
      return d.getHours() >= 12 ? 'pm' : 'am'
    }
  }, {
    pattern: '15',
    get: function (d) {
      return d.getHours()
    }
  }, {
    pattern: '01',
    get: function (d) {
      return pad(d.getMonth() + 1, '0')
    }
  }, {
    pattern: '_1',
    get: function (d) {
      return pad(d.getMonth() + 1, ' ')
    }
  }, {
    pattern: '02',
    get: function (d) {
      return pad(d.getDate(), '0')
    }
  }, {
    pattern: '_2',
    get: function (d) {
      return pad(d.getDate(), ' ')
    }
  }, {
    pattern: '03',
    get: function (d) {
      var h = d.getHours()
      return pad(h > 12 ? h - 12 : h, '0')
    }
  }, {
    pattern: '_3',
    get: function (d) {
      var h = d.getHours()
      return pad(h > 12 ? h - 12 : h, ' ')
    }
  }, {
    pattern: '04',
    get: function (d) {
      return pad(d.getMinutes(), '0')
    }
  }, {
    pattern: '_4',
    get: function (d) {
      return pad(d.getMinutes(), ' ')
    }
  }, {
    pattern: '05',
    get: function (d) {
      return pad(d.getSeconds(), '0')
    }
  }, {
    pattern: '_5',
    get: function (d) {
      return pad(d.getSeconds(), ' ')
    }
  }, {
    pattern: '1',
    get: function (d) {
      return d.getMonth() + 1
    }
  }, {
    pattern: '2',
    get: function (d) {
      return d.getDate()
    }
  }, {
    pattern: '3',
    get: function (d) {
      var h = d.getHours()
      return h > 12 ? h - 12 : h
    }
  }, {
    pattern: '4',
    get: function (d) {
      return d.getMinutes()
    }
  }, {
    pattern: '5',
    get: function (d) {
      return d.getSeconds()
    }
  }
]
