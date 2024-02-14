// index.js
// where your node app starts

/*Before starting next project - try using the service. */

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/", function(req, res) { //<- This is based on a discussion in the forums, thanks 'murphyg'. 
    var date = new Date();
    res.json({
	unix: date.valueOf(),
	utc: date.toUTCString()
    });
});
app.get("/api/:unix_time", function (req, res) {//Interpret what is after /api/ as what we are looking for. 
    const temp = req.params;//This is an object
    const time = temp.unix_time;
    const midnight = "T00:00:00";
    const regexNumbers = /^\d+$/;
    let unixTime;
    let date;//If date.valueOf() is NaN, the date is invalid.
    if(regexNumbers.test(time))
    {
	console.log("Match");
	unixTime = parseInt(time,10);
	date = new Date(unixTime);
    }
    else if(time=="")
    {
	console.log("Empty value");
	date = new Date();
	unixTime = date.getTime();
    }
    else
    {
	date = new Date(time);
	unixTime = date.getTime();
    }
    const utcTime = date.toUTCString();
   // const temp = timeStamp.getTime();//only correct for some input.
    //  timeStamp = new Date();
    //Convert to Date, use getTime();
    if(isNaN(date.valueOf()))
    {
	res.json({error: "Invalid Date"});
    }
    else
    {
    res.json({
	unix: unixTime,
	utc: utcTime
    });
    }
    console.log(time);
    console.log(date);
    console.log(unixTime);
   // console.log(timeStamp.getTime());
    console.log("######");
});
    


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
