/**
 * Created by albert on 10/19/16.
 */
'use strict'

var express = require('express');
var app = express();

app.use( express.static('./') );



/* ===============================
 SERVER DATA
 ============================== */
 let TODOS = [{id:1234, title:'hello world', is_checked:false}];

/* ===============================
 ROUTE
 ============================== */

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.broadcast.emit(TODOS);
//   // listen to todo update
//   socket.on('update todos', (todos) => {
//     TODOS = {};
//     io.emit('get todos', TODOS);
//   })
// });

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
});

app.get( '/todos', ( req, res ) => {
  res.json( TODOS );
});

app.listen( 8080, () => {
  console.log( 'server started. listening to 8080' );
});