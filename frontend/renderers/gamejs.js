var {PythonShell} = require('python-shell')
// const {spawn} = require('child_process');
// import {spawn} from 'child_process';
// const ls = spawn('ls', ['-lh', '/usr']);

// const { PythonShell } = require('python-shell');
//document.getElementById("game").addEventListener("click", opencvfn);
document.getElementById("tetris").addEventListener("click", tetris_game);
document.getElementById("car-game").addEventListener("click", car_game);
document.getElementById("bubble-game").addEventListener("click", bubble_game);
document.getElementById("quiz-game").addEventListener("click", quiz_game);
document.getElementById("squid-game").addEventListener("click", squid_game);
document.getElementById("flappy-game").addEventListener("click", flappy_game);
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

function tetris_game(){
  PythonShell.run('./renderers/python/tetris/Tetris.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}
function car_game(){
  PythonShell.run('cargame.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}
function bubble_game(){
  PythonShell.run('./renderers/python/bubble/bubble.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}
function quiz_game(){
  PythonShell.run('./renderers/python/quiz/quiz.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}
function squid_game(){
  PythonShell.run('redlightgreen.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}
function flappy_game(){
  PythonShell.run('flappy.py',null,  function (err) {
    if (err) throw err;
    console.log('finished');
  });
}