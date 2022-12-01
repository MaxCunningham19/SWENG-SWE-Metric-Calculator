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

async function uploadSize(repo, api) {

    dataToSend = None
    succ = false
    // Reading Python files
    // spawn new child process to call the python script
    // passes repo and api as arguments to the call
    const python = spawn('python', ['server.py', repo, api]);

    // collect data from script
    python.stdout.on('data', function (data) {
        succ = true
        dataToSend = data.toString();
    });

    python.stderr.on('data', data => {
        dataToSend = data
        console.error(`stderr: ${data}`);
    });

    await new Promise((resolve) => {
        python.on('exit', (code) => {
            resolve();
        })

    });

    return dataToSend, succ
};

app.get("/api", async (req, res) => {
    var data, success = await uploadSize(req.body.repo_name, req.body.api_key);
    if (success) {
        console.log(data)
        res.sendStatus(200)
        res.setHeader("Content-Type", "application/json");
        res.json(JSON.parse(data));
    } else {
        res.setHeader("Content-Type", "application/json");
        res.sendStatus(400).send(data.toString())
    }
})

app.listen(5000, () => { console.log("Server started on port 5000") })

