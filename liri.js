//to read and set any environment variables with the dotenv package
require("dotenv").config();

var keys = require("keys.js");
var fs = require("fs");
var request = require("request");


//Global vars to access API key info
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Global vars to register user input from terminal
var liriCommand = process.argv[2];
var mediaName = process.argv[3];


