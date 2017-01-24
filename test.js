var request = require('request');
var cheerio = require('cheerio');
var date = [];
var person = [];
var type = [];

function callback(date, person, type) {
  console.dir({
      date: date,
      person: person,
      type: type
    });
}

for (var p = 0; p < 42; p++) {
  request('http://www.colorado.edu/amath/events/archived-events?page=' + p, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      // Dates
      $('.date').each(function () {
        date.push($(this).text().trim());
      });

      // Title + Person
      $('.node-title').each(function(){
        if ($(this).text().indexOf('-') >= 0) {
          var toSplit = $(this).text().split('-');
          type.push(toSplit[0].trim());
          person.push(toSplit[1].trim());
        }

        else if($(this).text().indexOf(':') >= 0) {
          var toSplit = $(this).text().split(':');
          type.push(toSplit[0].trim());
          person.push(toSplit[1].trim());
        }

        else {
          type.push($(this).text().trim());
          person.push('');
        }
      });

      if (p == 39) {
        callback(date, person, type);
      }
    }
  });
}
