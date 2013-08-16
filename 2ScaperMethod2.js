/*request (/*input url from queue), function(err,resp,body) {
			//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
			$ = cheerio.load(body);
			//scrapeid = $('meta[name="description"]').attr('content');
			//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

			console.log ('Title: ' + $('#property-title h2').text());
			console.log ('Address: ' + $('#property-title h3').text());
			console.log ('Description: ' + $('.desc').text());
			console.log ('Summary: ' + $('.grey').text());
			console.log('Images: ');
			//console.log ('Image:' + $('.slideshow img').attr('src'));
			//console.log ('Image:' + $('.photos a:contains("View image")').attr('href'));
			links = $('.photos a');
			$(links).each(function (i,link){
					console.log($(link).text() + '\n ' + $(link).attr('href'));
			});	

		});
*/
var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging

	var mongoose = require('mongoose');//used for mongoose

	var db = mongoose.connection; //used for mongoose

	var geonoder = require('geonoder'); //used for geocoding

	db.on('error', console.error);
	db.once('open', function() {
		var housesSchema = new mongoose.Schema({
		  	address: String,
		  	latitude: Number,
		  	longitude: Number,
		  	rooms: String,
		  	price: String,
			desc: String,
			Schedule: String,
			EstateAgent: String,
			imageLinks: Array(),
			loc: {type: [Number], index: '2d'},
			saleID: String,
			addedOn: String 
		});
		var Property = mongoose.model('Property', housesSchema);

		//connect to rabiit messaging
		var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; // default to localhost
		var implOpts = {
		  reconnect: true,
		  reconnectBackoffStrategy: 'linear', // or 'exponential'
		  reconnectBackoffTime: 500, // ms
		};
		var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
		conn.on('ready', sub); // when connected, call "sub"

		function sub() {
	  		var exchange = conn.exchange(''); // get the default exchange
	  		var queue = conn.queue('lettingwebQueue', {}, function() { // create a queue	
	  			queue.subscribe(function(msg) { // subscribe to that queue
		      		//console.log(msg.body); // print new messages to the console
		      		url3 = (msg.body)
		      		//console.log(url3)

					request (url3, function(err,resp,body) {
						//console.log(url3)
						$ = cheerio.load(body);
						

						var tempAddress = $('#property-title h3').text().replace(/\s+/g,' ');
						var address = tempAddress.substring(0,tempAddress.indexOf("-"));
						var rooms = $('#property-title h2').text().replace(/\s+/g,' ');
						var price = $('.grey td:contains("Price")').text().replace(/\s+/g,' ');
						var description = $('.desc').text().replace(/\s+/g,' ').replace(/'\'/,'');
						var schedule = 'No Schedule';
						var estate = $('#MainContent_agentNameLink').text();
						var addOn = "Not available";

						var imageLinksTemp=new Array(); 
						links = $('.image1');
						$(links).each(function (i,link) {
							imageLinksTemp[i] =($(link).text() + '\n ' + $(link).attr('src')).trim();
							//console.log('imageLinks[' + i + ']' + imageLinks[i]);
						}); 

							geonoder.toCoordinates(address, geonoder.providers.google, function geo(lat, long) {
				   				//console.log('Lat: ' + lat + ' Long: ' + long) // 
				   				var lattitude = lat;
				   				var longtitude = long;
				   				save(lattitude, longtitude);
				   				
			   				});
			   			function save(lattitude, longtitude) {
			   				

				   			var house = new Property({
								address: (address),
								latitude:(lattitude),
								longitude:(longtitude),
								rooms: (rooms),
								price: (price),
								desc: (description),
								Schedule: (schedule),  
								EstateAgent:  (estate),
								imageLinks: imageLinksTemp,
								loc: [(longtitude),(lattitude)],
								saleID: 'For Rent',
								addedOn: addOn
							});

							//console.log(house);
							
							//saves the record 
							house.save(function(err, house) {
								if (err) return console.error(err);
								console.log(house); //prints the whole of the variable 
							});
						};

						
					});
	  			});
	  		});
		}
	});

	

	mongoose.connect('mongodb://property:pr0p3rty@dharma.mongohq.com:10016/property'); //connection for mongoose db