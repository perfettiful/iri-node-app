//to read and set any environment variables with the dotenv package
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

//Require for Twitter API
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});
//End Twitter API require

//Global vars to access API key info
//var spotify = new Spotify(keys.spotify);
//var Spotify = require('node-spotify-api');
 


//Global vars to register user input from terminal
var liriCommand = process.argv[2];
var mediaName = process.argv[3];


//*Main case/switch logic for available commands ///'my-tweets':show your last 20 tweets and when they were created at in your terminal/bash window.
///spotify-this-song
///movie-this
///do-what-it-says ***//// 

switch(liriCommand){

    case "my-tweets" :
        tweets();
    break;

    case "spotify-this-song" :
        spotify();
    break;

    case "movie-this" :
        movie();
    break;

    // case "do-what-it-says" :
    //     doWhatItSays();
    // break;
    
};//End switch cases

function tweets(){
    var params = {screen_name: mediaName};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        
        tweets.forEach(function(e){
            console.log("***********************************************")

            console.log("Timestamp: "+e.created_at);
            console.log("Tweet: "+e.text);
            
            //console.log(tweets[e].text, "Timestamp: " + tweets[e].created_at);
        })
      }
    });
};//End tweets() function

function spotify(){



};//End spotify function
