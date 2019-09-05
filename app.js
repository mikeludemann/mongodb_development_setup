import http from 'http';
// import https from 'https';
import express from 'express';
import session from 'express-session';
import pug from 'pug';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import config from 'config';
import mongo from 'mongodb';

// Config file

var environmentFile = dotenv.config();

// Connection to database

import { MongoClient } from 'mongodb';
var url = "mongodb://localhost:27017/testing";

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	
	console.log("Connect to the server!");
	console.log("Connect to the database!");

	var contactPerson = { firstname: "John", lastname: "Doe", street: "Test Street", streetnumber: "0", postalcode: "00000", city: "Test Town" };

	db.collection("persons").insertOne(contactPerson, function(err, res) {

		if (err) throw err;
		
		console.log("Inserted a new contact person");

		db.close();
		
  });
	
});

/**
	* Routing with Express
	* 
	* Setup and Configuration
	*/

var app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: true
	}
}));

app.use(function(req,res,next){
	req.db = db;
	next();
})

app.get("/", function(req, res){
	res.render("index",{
		title: "Home",
	});
});

/**
	* Error handler
	*/

// 404 and forward to error handler
app.use(function(req, res, next) {

	next(createError(404));
	
});

// error handler
app.use(function(err, req, res, next) {

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');

});

/**
	* Setup for http(s) Server
	* 
	* Express within http(s) server
	*/

var server = http.createServer(app);
// var serverSecure = https.createServer(credentials, app);

server.listen(3000);
// serverSecure.listen(8443);
