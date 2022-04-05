const {app, ipcMain} = require('electron');
const { MongoClient,ObjectId } = require("mongodb");
const {createAuthWindow} = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const uri = "mongodb+srv://mongo:mongo@cluster0.rrzcd.mongodb.net/mongotrondb?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const dbName = "mongotrondb";

ipcMain.on("name",(program, data)=>{
  // console.log(data);
  username = data;
})
// function getCloseTime(){
// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
//   console.log(dateTime);
// }
let doc_id="";
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
      // ipcMain.on("name",(program, dataa)=>{
      //   console.log("^&^%%&^*&&%%^%^&%^%^^");
      //   console.log(dataa);
      //   username = dataa;
      // })
      let personDocument = {
        "name" : "app start time",
        "starttime" : dateTime,
        // "user name" : username
      }
       // Insert a single document, wait for promise so we can read it back
       const p = await col.insertOne(personDocument);
       // Find one document
       //const myDoc = await col.findOne();
       // Print to the console
       console.log(p);
       doc_id = p.insertedId.toString();
       console.log(doc_id);


  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

async function run_close(doc_id) {      //function to get and send the close time
  try {
      await client.connect();
      console.log("Connected correctly to server");
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      const db = client.db(dbName);
      const col = db.collection("mongotroncol");
      // let personDocument = {
      //   "name" : "app close time",
      //   "start time" : dateTime,
      //   "user name" : username
      // }
       // Insert a single document, wait for promise so we can read it back
       //const p = await col.insertOne(personDocument); //commenting this for a moment
       // Find one document
       //const myDoc = await col.findOne();
       // Print to the console
       //console.log(p);
       console.log("printing start time id");
       console.log(doc_id);
       console.log("trying to retrive start time document here:")
       const newdoc = await col.findOne({_id : ObjectId(doc_id)});
       console.log(newdoc.starttime);
       


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
     run_close(doc_id);   // calling this function to get and send the end time but getting this error :
    // MongoNotConnectedError: MongoClient must be connected to perform this operation
    
    console.log("app is closed");
  }
  // getCloseTime();
  // app.quit();
});