const {app} = require('electron');
const { MongoClient } = require("mongodb");
const {createAuthWindow} = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const uri = "mongodb+srv://mongo:mongo@cluster0.rrzcd.mongodb.net/mongotrondb?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const dbName = "mongotrondb";

// function getCloseTime(){
// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
//   console.log(dateTime);
// }

async function run_start() {    //function to get and send the start time
  try {
      await client.connect();
      console.log("Connected correctly to server");
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      const db = client.db(dbName);
       // Use the collection "people"
      const col = db.collection("mongotroncol");
      let personDocument = {
        "name" : "app start time",
        "start time" : dateTime
      }
       // Insert a single document, wait for promise so we can read it back
       const p = await col.insertOne(personDocument);
       // Find one document
       //const myDoc = await col.findOne();
       // Print to the console
       console.log(p);


  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

async function run_close() {      //function to get and send the close time
  try {
      await client.connect();
      console.log("Connected correctly to server");
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      const db = client.db(dbName);
      const col = db.collection("mongotroncol");
      let personDocument = {
        "name" : "app close time",
        "start time" : dateTime
      }
       // Insert a single document, wait for promise so we can read it back
       const p = await col.insertOne(personDocument);
       // Find one document
       //const myDoc = await col.findOne();
       // Print to the console
       console.log(p);


  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}



async function showWindow() {
  try {
     await run_start();
    await authService.refreshTokens();
    
    return createAppWindow();
  } catch (err) {
     //await run_start();
    createAuthWindow();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // run().catch(console.dir);
     run_close();   // calling this function to get and send the end time but getting this error :
    // MongoNotConnectedError: MongoClient must be connected to perform this operation
    
    console.log("app is closed");
  }
  // getCloseTime();
  // app.quit();
});
