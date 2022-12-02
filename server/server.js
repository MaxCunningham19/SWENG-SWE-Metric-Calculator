//const express = require('express')
//const app = express()
//
const cors = require('cors')
const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
async function uploadSize(repo, api) {
    dataToSend = null
    succ = false
    // Reading Python files
    // spawn new child process to call the python script
    // passes repo and api as arguments to the call
    const python = spawn('python', ['server.py', repo, api]);

    // collect data from script
    python.stdout.on('data', function (data) {
        succ = true
        console.log(data.toString())
        dataToSend = data.toString();
    });

    python.stderr.on('data', data => {
        dataToSend = data
        console.error(`stderr: ${data}`);
    });

    // await new Promise((resolve) => {
    //     python.on('exit', (code) => {
    //         resolve();
    //     })

    // });
    console.log("data to send: "+dataToSend)
    console.log("status:" +succ)
    return [dataToSend, succ]

};


app.post("/api", async (req, res) => {
    var [data, success] = await uploadSize(req.body.repo_name, req.body.api_key);
    if (success) {
        console.log("data: "+data)
        
        res.sendStatus(200)
        // res.set("Content-Type", "application/json");
        return res.json(data);
    } else {
        // res.setHeader("Content-Type", "application/json");
        // return res.sendStatus(400).send(data.toString())
    }
})
app.get("/api",(req,res)=>{
    
    
})
app.listen(5000, () => { console.log("Server started on port 5000") })