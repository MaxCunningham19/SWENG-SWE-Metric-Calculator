//const express = require('express')
//const app = express()
//

const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function uploadSize()
{
      // Reading Python files
      var repo = "MaxCunningham19/SWENG-SWE-Metric-Calculator";
      var api = '' //token goes here
      
      // Reading Python files
      // spawn new child process to call the python script
      // passes repo and api as arguments to the call
      const python = spawn('python', ['server.py', repo, api]);

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

app.get("/api", async (req, res) =>{
    console.log('here')
    var data = await uploadSize();
    console.log(data)
    res.json(JSON.parse(data));
})

app.listen(8008, () => { console.log("Server started on port 5000") })

