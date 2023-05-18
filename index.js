const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');

const app = express();
// views
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))
// middleware
app.use(express.urlencoded());
// middleware to connect the css and js files in the 'asset' folder
app.use(express.static('assets'));

// middleware1

// app.use(function(req,res,next){
//     req.myName = "Arpan"
//     // console.log("middleware 1 called");
//     next();
// });

// middleware2
// app.use(function(req,res,next){
//     console.log("My name from MW2", req.myName);
//     next();
// })

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony",
        phone: "2321234567"
    },
    {
        name: "Peter",
        phone: "2134567832"
    }
]

// Route and controller function
app.get('/', function(req,res){
    // console.log('Name from get route controller', req.myName);
    return res.render('home', {title: 'My Contacts list', contact_list: contactList});  
});

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: 'playground'
    });
});

// for creating a contact
app.post('/create-contact', function(req,res){

// Add the new item to the array
    contactList.push(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    return res.redirect('back');
});
// for deleteting a contact
app.get('/delete-contact', function(req,res){
    // Using params
    // console.log(req.params);
    // let phone = req.params.phone;
    // Using query 
    console.log(req.query.phone);
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex!= -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})


app.listen(port, function(err){
    if(err){
        console.log('Error',err);
        return
    }
    console.log('My express server is running on port: ',port);
})