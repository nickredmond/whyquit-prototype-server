const express = require("express");
const app = express();
const port = 3000;

// other dependencies
const http = require("http-request");

app.get("/whyquit/source", (request, response) => {
    var request = http.get("http://whyquit.com", function(err, externalResponse) {
        if (err) {
            console.log("error occurred getting source of whyquit.com: " + err.toString());
        }
    
        var responseContent = externalResponse.buffer.toString();
        response.send(responseContent);
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log("ERROR: " + JSON.stringify(err));
    }

    console.log(`server is listening on port ${port}`);
});