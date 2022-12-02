//const express = require('express')
//const app = express()
//

const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function uploadSize(api, repo) {
    // Reading Python files
    //   var repo = "MaxCunningham19/SWENG-SWE-Metric-Calculator";
    //   var api = '' //token goes here

    // Reading Python files
    // spawn new child process to call the python script
    // passes repo and api as arguments to the call
    const python = spawn('python3', ['server.py', repo, api]);


    // collect data from script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
    });



    // in close event we are sure that stream from child process is closed, use await to make sure the process is done before returning
    await new Promise((resolve) => {
        python.on('exit', (code) => {
            //console.log(`child process exited with code ${code}, ${dataToSend}`);
            resolve();
        })

    });

    return dataToSend
};

app.get("/api", async (req, res) => {
    console.log(req,'here')
    var data = await uploadSize(req.body.api, req.body.name);
    console.log(data)
    res.setHeader('Content-Type','application/json')
    res.setHeader('Access-Control-Allow-Origin','*')
    res.json(JSON.parse(data));
})

app.post("/api", async (req, res) => {
    console.log(req,'here')
    var data = await uploadSize(req.body.api, req.body.name);
    console.log(data)
    res.setHeader('Content-Type','application/json')
    res.setHeader('Access-Control-Allow-Origin','*')
    res.json(JSON.parse(data));
})

app.listen(8080, () => { console.log("Server started on port 8080") })

