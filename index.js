// to have access to local or global scripts
require(process.cwd() + '/node_modules/benja').paths();
var wifi = require('node-wifi');

// simple server example
require('http')
  .createServer(require('tiny-cdn').create({}))
  .listen(8080, '0.0.0.0');
  // will respond to :80 too via iptables

// simple app example
const
  electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow
;

require('electron-debug')({showDevTools: true});

// in case by default WebGL doesn't work ... (rpi or others)
app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// once the app is ready
app.once('ready', () => {

  const area = electron.screen.getPrimaryDisplay().workAreaSize;

  

  // a reference is needed so the GC
  // won't kill the view
  this.window = new BrowserWindow({
    backgroundColor: '#000000',
    frame: true,
    // in some case kiosk: true is not working
    // same goes for fullscreen but this is working
    fullscreen: false,
    // x: 0,
    // y: 0,
    // width: area.width,
    // height: area.height,
    width: 800,
    height: 600,

    webPreferences: {
      webSecurity: false
    }
  });

  this.window
    .once('closed', () => {
      // cleanup the reference
      this.window = null;
    })
    // .loadURL('http://localhost:8080/');
    .loadURL('http://localhost:8080/?_=' + Math.random());
    // test CSS
 // .loadURL('https://codepen.io/bennettfeely/full/tfbCo/');
    // test WebGL
 // .loadURL('http://get.webgl.org/');
    // stress WebGL
 // .loadURL('https://threejs.org/examples/webgl_geometry_cube.html');


  // for debugging purpose, it might be handy to be able
  // to reload the window simply via `touch ~/app/reload`
  require('fs').watch('reload', () => app.quit());

});