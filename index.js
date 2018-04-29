const express = require("express");
const app = express();
const port = 3000;

// other dependencies
const http = require("http-request");
//const DomParser = require("dom-parser");
const fs = require("fs");

// var whyquitDom = false;
// datetime lastretrieved; get on the daily?

// app.get("/whyquit/source", (request, response) => {
//     var request = http.get("http://whyquit.com", function(err, externalResponse) {
//         if (err) {
//             console.log("error occurred getting source of whyquit.com: " + err.toString());
//         }
    
//         var responseContent = externalResponse.buffer.toString();
//         var parser = new DomParser();
//         var whyquitDom = domParser.parseFromString(whyQuitContent, "text/html");

//         response.set("Access-Control-Allow-Origin", "*");
//         response.send(responseContent);
//     });
// });

var SECONDARY_STORIES = [
    {
        "title": "Quitting for New Year's?",
        "description": "Why 12 out of 13 New Year's quit smoking resolutions fail",
        "whyquit_link": "http://whyquit.com/pr/122711.html"
    },
    {
        "title": "Dangers of Nicotine Replacement",
        "description": "10 studies that scream, \"Leave replacement nicotine alone!\"",
        "whyquit_link": "http://whyquit.com/pr/010115.html"
    },
    {
        "title": "Thinking about E-Cigarettes?",
        "description": "Ten reasons to try cold-turkey before e-cigarettes",
        "whyquit_link": "http://whyquit.com/pr/101413.html"
    }
];
var getSecondaryStories = function() {
    return SECONDARY_STORIES;
};

var TOP_STORIES = [
    {
        "title": "The Law of Addiction",
        "imageFilename": "law-of-addiction.png",
        "whyquit_link": "http://whyquit.com/freedom/the-law-of-addiction/"
    },
    {
        "title": "Freedom from Nicotine Book",
        "imageFilename": "freedom-from-nicotine.png",
        "whyquit_link": "http://whyquit.com/ffn/index.html"
    }
];
var getTopStories = function() {
    return TOP_STORIES;
};

var allowAnyOrigin = function(response) {
    response.set("Access-Control-Allow-Origin", "*");
};

app.get("/whyquit/images/:imageName", (request, response) => {
    var imageName = request.params.imageName;
    var img = fs.readFileSync("./images/" + imageName);
    allowAnyOrigin(response);
    response.writeHead(200, { "Content-Type": "img/jpg" });
    response.end(img, "binary");
});

app.get("/whyquit/top-stories", (request, response) => {
    var topStories = getTopStories();
    allowAnyOrigin(response);
    response.send(topStories);
});

app.get("/whyquit/secondary-stories", (request, response) => {
    var secondaryStories = getSecondaryStories();
    allowAnyOrigin(response);
    response.send(secondaryStories);
})

app.listen(port, (err) => {
    if (err) {
        return console.log("ERROR: " + JSON.stringify(err));
    }

    console.log(`server is listening on port ${port}`);
});