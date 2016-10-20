/**
 * Created by albert on 10/19/16.
 */
'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use( express.static('./') );



/* ===============================
 SERVER DATA
 ============================== */
 let TODOS = [];

/* ===============================
 ROUTE
 ============================== */

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit(TODOS);
  // listen to todo update
  socket.on('update todos', (todos) => {
    TODOS = {};
    io.emit('get todos', TODOS);
  })
});

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
})

http.listen( 8080, () => {
  console.log( 'server started. listening to 8080' );
})
