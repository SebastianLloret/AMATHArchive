var request = require('request');
var cheerio = require('cheerio');

request('http://www.colorado.edu/amath/events/archived-events', function(error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var date = [];
    var person = [];
    var title = [];

    // Dates
    $('.date').each(function () {
      date.push($(this).text().trim());
    });

    // Title + Person
    $('.node-title').each(function(){
      if ($(this).text().indexOf('-') >= 0) {
        var toSplit = $(this).text().split('-');
        title.push(toSplit[0].trim());
        person.push(toSplit[1].trim());
      }

      else if($(this).text().indexOf(':') >= 0) {
        var toSplit = $(this).text().split(':');
        title.push(toSplit[0].trim());
        person.push(toSplit[1].trim());
      }

      else {
        title.push($(this).text().trim());
        person.push('');
      }
    });

    for (var i = 0; i < date.length; i++) {
      if (person[i] == ''){
        console.log(date[i] + ' - \"' + title[i] + '\"')
      }
      else {
        console.log(date[i] + ' - ' + person[i] + ' \"' + title[i] + '\"');
      }
    }
  }
});
