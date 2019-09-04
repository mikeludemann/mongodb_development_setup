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

// Config file

var environmentFile = dotenv.config();

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

app.get("/", function(req, res){
	res.render("index",{
		title: "Home"
	});
});

/**
	* Error handler
	*/


/**
	* Setup for http(s) Server
	* 
	* Express within http(s) server
	*/

var server = http.createServer(app);
// var serverSecure = https.createServer(credentials, app);

server.listen(3000);
// serverSecure.listen(8443);
