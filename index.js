// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const mongoose = require('mongoose');
const validator = require('validator');


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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const DateModel = mongoose.model('DateModel', dateSchema);

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  const debug = "KPC "

  // console.log(debug, "Checando o conteúdo de req.params.date = ", dateParam, debug, typeof dateParam);
  let inputObj = new DateModel({date: dateParam});

  inputObj.validate()
  .then(() => {
    console.log(debug);
    let dateObj = new Date(inputObj.date);
    let timestamp = dateObj.getTime();
    let utc = dateObj.toUTCString();
      res.status(200).json(
        {unix: timestamp, utc: utc}
       );
  })
  .catch(err => {
    return res.status(400).json({ error: 'Invalid date' });
  });









  //isDate = validator.isDate(inputObj.date);
  //console.log(debug, "isDate = ", isDate, debug, typeof isDate);


  //inputObj = new DateModel({date: Date.now()});

  // if (isDate) {
  //   console.log(debug);
  //   dateObj = new Date(inputObj.date);
  //   timestamp = dateObj.getTime();
  //   utc = dateObj.toUTCString();
  //     res.status(200).json(
  //       {unix: timestamp, utc: utc}
  //      );

  // } else if (!dateParam) {
  //   inputObj = new DateModel({date: Date.now()});
  // } else {
  //   return res.status(400).json({ error: 'Invalid date' });
  // }

 

  // if (!validator.isDate(inputObj.date)) {
  //   return res.status(400).json({ error: 'Invalid date' });
  // } else {
  //   dateObj = new Date(inputObj.date);
  //   timestamp = dateObj.getTime();
  //   utc = dateObj.toUTCString();
  //   res.status(200).json(
  //     {unix: timestamp, utc: utc}
  //   );
  
  // }
  //console.log(debug, dateObj, debug, timestamp, debug, utc);



//   if (!isNaN(dateParam)) {
//     //console.log(debug, !isNaN(dateParam), typeof dateParam, dateParam);


//     //dateParam = parseInt(dateParam);

// //    dateObj = new Date(dateParam);
//     dateObj = new Date(inputObj.date);


//     //console.log(dateObj);

//     timestamp = dateObj.getTime();
//     utc = dateObj.toUTCString();
//     console.log(debug, dateObj, debug, timestamp, debug, utc);

//   }
//   else {
//     //console.log(debug, !isNaN(dateParam), typeof dateParam, dateParam);

//     //console.log(dateParam, typeof dateParam);
//     dateObj = new Date(inputObj.date);
//     //console.log(dateObj);

//     utc = dateObj.toUTCString();
//     timestamp = dateObj.getTime()
//   }
  //console.log(timestamp, typeof timestamp, utc, typeof utc),


});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
