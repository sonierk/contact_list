// Require the libary
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection to check if it is sucessfull.
const db = mongoose.connection;

// Error 
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then prints the message.
db.once('open', function(){
    console.log('Successfully connected to db')
})