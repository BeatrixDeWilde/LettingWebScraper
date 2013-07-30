var request = require('request'); // lets you connect to web pages

var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors




var url = 'http://www.haddenrankin.com/sell-with-us/properties-for-sale.aspx';


request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);

	$('.property_small_image a:contains("full details")').each(function() {

		console.log ($(this).attr('href'));

		request ('http://www.haddenrankin.com/' + $(this).attr('href'), function(err,resp,body) {
			//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
			$ = cheerio.load(body);
			//scrapeid = $('meta[name="description"]').attr('content');
			//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

			console.log ('Address:' + $('#property_detail h3').text());
			console.log ('rooms:' + $('#property_detail h4').text());
			console.log ('Description:' + $('.main_decription').text());
			console.log ('Schedule:' + $('a[class="schedule_download"]').attr('href'));
			//console.log ('Schedule:' + $('#schedule_download li a:contains("href")').text());

		});
	});
});

request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);


	$('.pager a:contains()').each(function() {
		url = ('http://www.haddenrankin.com/sell-with-us/properties-for-sale.aspx' + $(this).attr('href'));
		console.log (url);

		request(url, function(err, resp, body) {

		if (err)

			throw err;

			$ = cheerio.load(body);

			$('.property_small_image a:contains("full details")').each(function() {

				console.log ($(this).attr('href'));

				request ('http://www.haddenrankin.com/' + $(this).attr('href'), function(err,resp,body) {
					//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
					$ = cheerio.load(body);
					//scrapeid = $('meta[name="description"]').attr('content');
					//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

					console.log ('Address:' + $('#property_detail h3').text());
					console.log ('rooms:' + $('#property_detail h4').text());
					console.log ('Description:' + $('.main_decription').text());
					console.log ('Schedule:' + $('a[class="schedule_download"]').attr('href'));
					//console.log ('Schedule:' + $('#schedule_download li a:contains("href")').text());

				});
			});
		});
				
	});
});