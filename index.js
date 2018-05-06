const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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
        "linkAddress": "http://whyquit.com/pr/122711.html"
    },
    {
        "title": "Dangers of Nicotine Replacement",
        "description": "10 studies that scream, \"Leave replacement nicotine alone!\"",
        "linkAddress": "http://whyquit.com/pr/010115.html"
    },
    {
        "title": "Thinking about E-Cigarettes?",
        "description": "Ten reasons to try cold-turkey before e-cigarettes",
        "linkAddress": "http://whyquit.com/pr/101413.html"
    }
];
var getSecondaryStories = function() {
    return SECONDARY_STORIES;
};

var TOP_STORIES = [
    {
        "title": "The Law of Addiction",
        "imageFilename": "law-of-addiction.png",
        "linkAddress": "http://whyquit.com/freedom/the-law-of-addiction/"
    },
    {
        "title": "Freedom from Nicotine Book",
        "imageFilename": "freedom-from-nicotine.png",
        "linkAddress": "http://whyquit.com/ffn/index.html"
    }
];
var getTopStories = function() {
    return TOP_STORIES;
};

var TOO_YOUNG_INFO = [
    {
        "name": "Noni",
        "age": 32,
        "imageFilename": "noni.jpg",
        "linkAddress": "http://whyquit.com/whyquit/A_Noni.html"
    },
    {
        "name": "Kim",
        "age": 44,
        "imageFilename": "kim.jpg",
        "linkAddress": "http://whyquit.com/whyquit/A_Kim.html"
    },
    {
        "name": "Quentin",
        "age": 23,
        "imageFilename": "quentin.jpg",
        "linkAddress": "http://whyquit.com/whyquit/A_Quentin.html"
    },
    {
        "name": "Deborah",
        "age": 38,
        "imageFilename": "deborah.jpg",
        "linkAddress": "http://whyquit.com/whyquit/A_Deborah.html"
    },
    {
        "name": "Bryan",
        "age": 33,
        "imageFilename": "bryan.jpg",
        "linkAddress": "http://whyquit.com/whyquit/BryanLeeCurtis.html"
    },
    {
        "name": "Carrie",
        "age": 33,
        "imageFilename": "carrie.jpg",
        "linkAddress": "http://whyquit.com/whyquit/notables.html"
    }
];
var getTooYoungInfo = function() {
    return TOO_YOUNG_INFO;
};

var allowAnyOrigin = function(response) {
    response.set("Access-Control-Allow-Origin", "*");
};

var returnImageData = function(imageName, imageDirectory, response) {
    var img = fs.readFileSync(imageDirectory + "/" + imageName);
    allowAnyOrigin(response);
    response.writeHead(200, { "Content-Type": "img/jpg" });
    response.end(img, "binary");
};

app.get("/whyquit/images/:imageName", (request, response) => {
    returnImageData(request.params.imageName, "./images", response);
});

app.get("/whyquit/images/too-young/:imageName", (request, response) => {
    returnImageData(request.params.imageName, "./images/too-young", response);
});

app.get("/whyquit/images/icons/:imageName", (request, response) => {
    returnImageData(request.params.imageName, "./images/icons", response);
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

app.get("/whyquit/too-young", (request, response) => {
    var tooYoungInfo = getTooYoungInfo();
    allowAnyOrigin(response);
    response.send(tooYoungInfo);
});

app.listen(port, (err) => {
    if (err) {
        return console.log("ERROR: " + JSON.stringify(err));
    }

    console.log(`server is listening on port ${port}`);
});