var request = require('request');
var cheerio = require('cheerio');

request('http://www.colorado.edu/amath/events/archived-events?page=41', function(error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var dates = [];
    var person = [];
    var title = [];

    // Dates
    $('.date').each(function () {
      dates.push($(this).text().trim());
    });

    // Title + Person
    $('.node-title').each(function(){
      if ($(this).text().indexOf('-') >= 0) {
        var toSplit = $(this).text().trim().split(' -')
        title.push(toSplit[0]);
        person.push(toSplit[1].trim());
      }

      if($(this).text().indexOf(':') >= 0) {
        var toSplit = $(this).text().trim().split(':')
        title.push(toSplit[0]);
        person.push(toSplit[1].trim());
      }
    });


    console.log(dates);
    console.log(title);
    console.log(person);
  }
});
