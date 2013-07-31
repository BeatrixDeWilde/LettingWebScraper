var request = require('request'); // lets you connect to web pages

var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors




var url = 'http://www.lettingweb.com/flats-to-rent/edinburgh?currentPage=1&perpage=100';

for(counter=1;counter<2;counter++){
	var url = 'http://www.lettingweb.com/flats-to-rent/edinburgh?currentPage=' + counter + '&perpage=100';
	request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);

	$('.property .element a:contains()').each(function() {

		console.log ($(this).attr('href'));

		request ('http://www.lettingweb.com' + $(this).attr('href'), function(err,resp,body) {
			//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
			$ = cheerio.load(body);
			//scrapeid = $('meta[name="description"]').attr('content');
			//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

			console.log ('Title:' + $('#property-title h2').text());
			console.log ('Address:' + $('#property-title h3').text());
			console.log ('Description:' + $('.desc').text());
			console.log ('Summary:' + $('.grey').text());
			//console.log ('Image:' + $('.slideshow img').attr('src'));
			//console.log ('Image:' + $('.photos a:contains("View image")').attr('href'));
			links = $('.photos a');
			$(links).each(function (i,link){
					console.log($(link).text() + '\n ' + $(link).attr('href'));
			});	

		});
	});
});
}




/*

request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);

	$('.property .element a:contains()').each(function() {

		console.log ($(this).attr('href'));

		request ('http://www.lettingweb.com' + $(this).attr('href'), function(err,resp,body) {
			//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
			$ = cheerio.load(body);
			//scrapeid = $('meta[name="description"]').attr('content');
			//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

			console.log ('Title:' + $('#property-title h2').text());
			console.log ('Address:' + $('#property-title h3').text());
			console.log ('Description:' + $('.desc').text());
			console.log ('Summary:' + $('.grey').text());
			//console.log ('Image:' + $('.slideshow img').attr('src'));
			//console.log ('Image:' + $('.photos a:contains("View image")').attr('href'));
			links = $('.photos a');
			$(links).each(function (i,link){
					console.log($(link).text() + '\n ' + $(link).attr('href'));
			});	

		});
	});
});


request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);


	$('.pagination a:contains()').each(function() {
		url = ('http://www.lettingweb.com' + $(this).attr('href'));
		console.log (url);

		request(url, function(err, resp, body) {

			if (err)

				throw err;

			$ = cheerio.load(body);

			$('.property .element a:contains()').each(function() {

				console.log ($(this).attr('href'));

				request ('http://www.lettingweb.com' + $(this).attr('href'), function(err,resp,body) {
					//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
					$ = cheerio.load(body);
					//scrapeid = $('meta[name="description"]').attr('content');
					//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

					console.log ('Title:' + $('#property-title h2').text());
					console.log ('Address:' + $('#property-title h3').text());
					console.log ('Description:' + $('.desc').text());
					console.log ('Summary' + $('.grey').text());

				});
			});
		});
				
	});
});

*/ 
/*
var url2 = 'http://www.lettingweb.com/flats-to-rent/edinburgh?currentPage=5&perpage=100';
var counter = 0;
do{
	counter++;
	console.log("counter: " + counter);
	/*request(url2, function(err, resp, body) {
		console.log("url2: " + url2);
		if (err)

			throw err;

		$ = cheerio.load(body);

		$('.pagination ul li a:contains("Next")').each(function(){

			console.log ($(this).attr('href'));
			url2 = ("http://www.lettingweb.com/" + $(this).attr('href'));
			console.log(" second url2 " + url2);

			request ('http://www.lettingweb.com' + $(this).attr('href'), function(err,resp,body) {
				//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
				$ = cheerio.load(body);
				//scrapeid = $('meta[name="description"]').attr('content');
				//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

				console.log ('Title:' + $('#property-title h2').text());
				console.log ('Address:' + $('#property-title h3').text());
				console.log ('Description:' + $('.desc').text());
				console.log ('Summary:' + $('.grey').text());
				//console.log ('Image:' + $('.slideshow img').attr('src'));
				//console.log ('Image:' + $('.photos a:contains("View image")').attr('href'));
				links = $('.photos a');
				$(links).each(function (i,link){
						console.log($(link).text() + '\n ' + $(link).attr('href'));
				});	

			});
		});
		
	});
	
}while(counter<5)*/
