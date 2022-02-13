var {PythonShell} = require('python-shell')
// const {spawn} = require('child_process');
// import {spawn} from 'child_process';
// const ls = spawn('ls', ['-lh', '/usr']);

// const { PythonShell } = require('python-shell');
document.getElementById("game").addEventListener("click", opencvfn);
//import {PythonShell} from 'python-shell';
// PythonShell = require('python-shell');
// var path = require("path")


function opencvfn(){
    // PythonShell.runString('x=1+1;print(x)', null, function (err) {
    //     if (err) throw err;
    //     console.log('finished');
    //   });
    // var options={
    //     scriptPath : path.join(__dirname, '/../engine/'),
    //     mode: 'text',
    // }
    // let pyshell = new PythonShell('main.py', options);
    PythonShell.run('main1.py',null,  function (err) {
        if (err) throw err;
        console.log('finished');
      });
    // pyshell.on('message', function(message){
    //     console.log(message);
    // });
    
    console.log("&&&&&&&&");
    console.log("%%%hhjsdfhsdbfhbdshb&&&&&===----------");
}