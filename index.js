const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// other dependencies
const http = require("http-request");
const fs = require("fs");

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

var EDUCATION_ITEMS = [
    {
        "title": "Quitting: video lessons",
        "description": "Imagine having your very own stop-smoking coach; one of the world's best. " + 
            "Joel's free videos have been watched more than 4 million times as of 2013. Discover what " + 
            "happens once we become more dependency-recovery savvy than our addiction is strong!",
        "imageFilename": "joelvideo.gif",
        "linkAddress": "http://whyquit.com/joel#video"
    },
    {
        "title": "Withdrawal symptoms",
        "description": "Recovery is the time needed to allow the brain to again grow comfortable functioning " + 
            "without nicotine. Learn how to better manage your recovery symptoms so you can learn how to " +
            "comfortably engage all aspects of life without a want or need for nicotine.",
        "imageFilename": "nicneedle.jpg",
        "linkAddress": "http://whyquit.com/whyquit/A_Symptoms.html"
    },
    {
        "title": "Tips for recovery",
        "description": "There are many simple tips that could help nicotine addicts with some of the challenges " +
            "of quitting, including but limited to stress-related anxieties, healthy eating, reasons to quit, " +
            "excuses for relapse, and subconscious nicotine use triggers.",
        "imageFilename": null,
        "linkAddress": "http://whyquit.com/Tips2007.pdf"
    },
    {
        "title": "Smoking's impact on lungs",
        "description": "Smokers often feel they take in smoke and then blow most of it out, when in actuality, " + 
            "only a very small percentage comes out. Much damage can occur, but damage is reversible if " +
            "you quit in time.",
        "imageFilename": "palmolive_demo.jpg",
        "linkAddress": "http://whyquit.com/joel/Joel_02_17_smoke_in_lung.html"
    },
    {
        "title": "Nicotine addiction 101",
        "description": "Nicotine dependency, like alcoholism, is a real mental illness. While one may fully and " + 
            "comfortably arrest chemical addiction, there is no cure, though full recovery is entirely do-able for all. " + 
            "Roughly half of quitters report that recovery was far easier than expected, especially when taking it \"one " +
            "day at a time\".",
        "imageFilename": "needlemarlboro.gif",
        "linkAddress": "http://whyquit.com/whyquit/LinksAAddiction.html"
    },
    {
        "title": "Manage cravings and stress",
        "description": "For new quitters, many cravings may be coming, but the power of your crave generator fizzles " +
            "a bit with each passing day. With each craving encountered there's one less triggering cue to extinguish.",
        "imageFilename": null,
        "linkAddress": "http://whyquit.com/whyquit/Links_CravesAndStress.html"
    }
];
var getEducationItems = function(skip, take) {
    return EDUCATION_ITEMS.slice(skip, skip + take);
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

app.get("/whyquit/images/education/:imageName", (request, response) => {
    returnImageData(request.params.imageName, "./images/education", response);
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

app.get("/whyquit/education", (request, response) => {
    var skip = request.query.size * (request.query.pageNumber - 1);
    var take = request.query.size;
    var educationItems = getEducationItems(skip, take);
    allowAnyOrigin(response);
    response.send(educationItems);
})

app.listen(port, (err) => {
    if (err) {
        return console.log("ERROR: " + JSON.stringify(err));
    }

    console.log(`server is listening on port ${port}`);
});