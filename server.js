var express = require('express');
var app = express();

//bodyparser boilerplate
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//cookie session boilerplate
var session = require("express-session");
app.use(session({
    secret: 'keyboard cat', // secret key
    resave: false, // default value
    saveUninitialized: true, // saves empty objects
    cookie: {
    }
}));

/*
   Create the mongodb streetsafedb if it hasn't been created already and
   connect to it.
*/
var MongoClient = require("mongodb").MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017/streetsafedb', function(err, database) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to the streetsafedb database!");
	db = database;

    // Create the street_safe_data collection
    db.createCollection("street_safe_data", function(err, res) {
        if (err) throw err;
        console.log("Street_safe_data collection created!");
    });

    /*
       Insert the data from a spreadsheet into the mongodb database
    */
    var xlsx = require('node-xlsx').default;
    const workSheetsFromFile = xlsx.parse('street_safe_data.xlsx');
    // Get the first row or categories from the spreadsheet
    var categories = workSheetsFromFile[0].data[0];
    // Get the rest of the rows from the spreadsheet
    var entries = workSheetsFromFile[0].data.slice(1);

    // console.log(categories.length);
    // console.log(entries);

    // Insert the entries with the correct categories into database
    //for (var i = 0; i < entries.length; i++) {
        db.collection('street_safe_data').insertOne({
            "hello": "world"
            // categories[0]: entries[i][0],
            // categories[1]: entries[i][1],
            // categories[2]: entries[i][2],
            // categories[3]: entries[i][3],
            // categories[4]: entries[i][4],
            // categories[5]: entries[i][5]
        },
        function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    //}


    startListening();
});

app.post('/register', function(req, res) {
    db.collection("users").findOne({
            username: req.body.username
        }, function(err, data) {
            // If we get an error, that means something is really wrong -- no DB connection, etc.
            if (err) {
                console.log(err);
                res.send("error");
                return;
            }

            // if data is set here, that means we found a user with that username, so we tell the frontend.
            if (data) {
                res.send("existing");
                return;
            }
            // Otherwise, add a new user to the db
            db.collection("users").insert(req.body, function(err, data){
                // This means fatal error -- no db, etc.

                if (err) {
                    console.log(err);
                    res.send("error");
                    return;
                }
                req.session._id = data.insertedIds[0];
                // Successfully added the user
                // server-side redirect. this responds to the client, saying "hey, you need to send another GET request to /dashboard
                // because this request started as an ajax request, we can't use res.redirect. we'll have to just inform the client that the request was successful, and then the client can decide what to do
                res.send({success:'success'});
            });
        }
    );
});

app.post('/login', function(req, res) {
    db.collection("users").findOne(req.body, function(err, data) {
            if (err) {
                console.log(err);
                res.send('error');
                return;
            }
            if (data) {
                req.session._id = data._id;
                res.send({success:'success'});
            } else {
                res.send('Failed to login');
            }
        }
    );
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/entry', function (req, res) {
    db.collection('entry').find(function(err, data) {
        if (err) {
            console.log(err);
            res.send('error');
            return;
        }
        if (data) {
            res.send(data);
        }
    });
});

//serve public folder
app.use(express.static('public'));

// 404 File Not Found
app.use(function(req, res, next) {
    res.status(404);
    res.send("404 File not Found");
});

// 500 Server Error Handler
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500);
    res.send("500 Internal Server Error");
});

function startListening() {
    app.listen(3000, function() {
        console.log('ServerStarted at http://localhost:3000 ⚡');
    });
}
