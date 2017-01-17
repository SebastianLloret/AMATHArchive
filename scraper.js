var request = require('request');
var cheerio = require('cheerio');

request('https://www.colorado.edu/amath/2016/10/27/complexdynamical-systems-seminar-or-alus', function(error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var dates = [];
    var person = [];
    // Dates
    // Grab all text inside of elements with the class .author-meta, split at
    // ':', and remove whitespace at the beginning/end of the string.
    dates.push($('.author-meta').text().split(':')[1].trim());
    console.log(dates);
  }
});
