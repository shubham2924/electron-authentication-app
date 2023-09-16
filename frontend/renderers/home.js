const { ipcRenderer ,remote} = require('electron');
const axios = require('axios');
const authService = remote.require('./services/auth-service');
const authProcess = remote.require('./main/auth-process');

const webContents = remote.getCurrentWebContents();

webContents.on('dom-ready', () => {
  const profile = authService.getProfile();
  document.getElementById('picture').src = profile.picture;
  user_name = document.getElementById('name').innerText = profile.name;
  user_email =  document.getElementById('email').innerText = profile.email;
  //document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
  ipcRenderer.send("name",user_name);
  ipcRenderer.send("profiledata", profile);
  ipcRenderer.send("email",user_email);
});

document.getElementById('logout').onclick = () => {
  authProcess.createLogoutWindow();
  remote.getCurrentWindow().close();
};


