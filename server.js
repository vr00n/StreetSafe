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
var mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectId;
var db;
mongodb.MongoClient.connect('mongodb://localhost:27017/streetsafedb', function(err, database) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to Database");
	db = database;
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

db.createCollection("street_safe_data", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
});


/*
    Start the application
*/
startListening();

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

//serve public folder
app.use(express.static('public'));

function startListening() {
    app.listen(3000, function() {
        console.log('ServerStarted at http://localhost:3000 ⚡');
    });
}
