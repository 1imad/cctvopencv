const express   = require('express'),
      cv        = require('opencv4nodejs'),
      app       = express(),
      server    = require('http').Server(app),
      io        = require('socket.io')(server),
      path      = require('path');
//accessing camera using openCV
const wCap      = new cv.VideoCapture(0)
      FPS       = 10,;
//adj frame size
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300)

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));     
})

setInterval(()=>{
    const frame = wCap.read()
    const img = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', img)
}, 1000/FPS)

server.listen(3000);
