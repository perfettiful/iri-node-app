//to read and set any environment variables with the dotenv package
require("dotenv").config();

//Create a prompt for interactive user input
var inquirer = require("inquirer");

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

//Require for Spotify API
var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);
//End Spotify API require
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

//Global vars to register user input from terminal
var liriCommand = process.argv[2];
var mediaName = process.argv[3];
var inputedvalue = process.argv;
console.log(inputedvalue.length);

//*Main case/switch logic for available commands ///'my-tweets':show your last 20 tweets and when they were created at in your terminal/bash window.
///spotify-this-song
///movie-this
///do-what-it-says ***//// 
//do a if condition
if(inputedvalue.length === 2){
    //Wrap switch-case logic within inquirer prompt for which liri command user wants to execute
    inquirer.prompt([
        //Q1: Prompt user for which API they would like to query
        {
            type: "list",
            name: "apiToQuery",
            message: "From what service would you like request?",
            choices: ["Twitter", "Spotify", "OMDB", "Query from file.."]
        },
        //Q2: Inquire the title of the twitter, acct, song, or 
        {
            type: "input",
            name: "mediaTitleToQuery",
            message: "What is the title of the media (twitter handle, etc) you want to query?"
        }
        
    ]).then(function (userInput) {

        var switchCommand = userInput.apiToQuery;
        var mediaTitle = userInput.mediaTitleToQuery;

        
        switch (switchCommand) {
            case "Twitter":
                tweets(mediaTitle);
                break;
                case "Spotify":
                spotifyQuery(mediaTitle);
                break;
                case "OMDB":
                movie(mediaTitle);
                break;
                case "Query from file..":
                doWhatItSays();
                break;
        }; //End switch cases
    }); //End callback for user input
} //end else statement for inquirer prompt
else if (inputedvalue.length === 4) {

    switch (liriCommand) {
        case "my-tweets":
            tweets(mediaName);
            break;
        case "spotify-this-song":
            spotifyQuery(mediaName);
            break;
        case "movie-this":
            movie(mediaName);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }; //End switch cases
};//end else for custom liri args


function tweets(twitterHandle) {
    console.log(twitterHandle)
    var params = {
        screen_name: twitterHandle
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            tweets.forEach(function (e) {
                console.log("***********************************************")

                console.log("Timestamp: " + e.created_at);
                console.log("Tweet: " + e.text);

                //console.log(tweets[e].text, "Timestamp: " + tweets[e].created_at);
            })
        }
    });
}; //End tweets() function


function spotifyQuery(songTile) {

    console.log(songTile);
    spotify.search({ type: 'track', query: songTile }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].name); 
      });




}; //End spotify() function


function movie() {


}; //End movie() function


function doWhatItSays() {


}; //End doWhatItSays() function