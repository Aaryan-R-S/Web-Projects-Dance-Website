const fs = require("fs");
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dancewb', {useNewUrlParser: true, useUnifiedTopology: true});
//here dancewb is name of database
const port = 5000;

//define mongoose schema
const enrollSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    city: String,
    contact: String,
    email: String,
  });
  
//model //enroller(s) will be the name of collection
 const Enroller = mongoose.model('enroller', enrollSchema);
  
//EXPRESS SPECIFIC
app.use('/files', express.static('files')) ; //serve files
app.use(express.urlencoded()) ;

//PUG SPECIFIC
app.set('view engine', 'pug')//Set pug engine
app.set('views', path.join(__dirname, 'views'))//Location of pug file
//Dont change name of folder other than views default

//PUG ENDPOINTS
app.get('/', (req, res) => {
    const x = {}
    res.status(200).render('home.pug', x)
})
app.get('/login', (req, res) => {
    const x = {}
    res.status(200).render('login.pug', x)
})
app.get('/enroll', (req, res) => {
    const x = {}
    res.status(200).render('enroll.pug', x)
})
app.post('/enroll', (req,res)=>{
    var myData = new Enroller(req.body)   
    myData.save().then(()=>{
         res.send("This enrollment has been saved to the Database!--dancewb/enrollers")
    }).catch(()=>{
        res.status(400).send("Unable to save the enrollment in database--dancewb/enrollers")
    })
    res.status(200).render('home.pug')
    
    //optional--
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    city = req.body.city
    contact = req.body.contact
    email = req.body.email

    let O = `  Enroller's Details -- 
    Name : ${name}
    Age : ${age} years old
    Gender : ${gender} 
    City : ${city} , India
    Contact No. : ${contact}
    Email Id : ${email}   `
    fs.writeFileSync('Enroller.txt', O)
    //optional--
})


// START THE SERVER
app.listen(port, ()=>{
     console.log(`Dance Site has started on port ${port}`)
});

