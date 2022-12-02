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
      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python', ['server.py']);

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
    var data = await uploadSize();
    res.json(JSON.parse(data));
})

app.listen(8080, () => { console.log("Server started on port 8080") })

