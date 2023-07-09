const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const userData = require('./db/database');
const path = require('path');
const { dir } = require('console');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use('/home/:id',express.static('public'));
app.use('/',express.static('public'));

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/Social_Media/RestAPI', router);

app.set('view engine', 'ejs');


//server side scripting
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

app.get('/logout', (req, res) => {
    res.redirect('/');
})

app.get('/home/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.post('/handleLogin', async (req, res) => {
    try {
        var body = req.body;
        
        var user = await userData.findOne({email: body.email});
    
        if(user){
            if(body.password == user.password){
                res.redirect('/home/'+user._id);
            }else{
                res.send("password was incorrect");
            }
        }else{
            res.send("email was not found");
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/handleRegister', async (req, res) => {
    try {
        var body = req.body;
        
        var user = await userData.findOne({username: body.username, email: body.email});
    
        if(user == null){
            userData.create({
                username: body.username,
                email: body.email,
                password: body.password
            }).catch(err => console.log(err));

            res.redirect('/');
        }else{
            res.send("username or email already exists");
        } 
    } catch (error) {
        console.log(error);
    }
})

async function start(){
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('mongodb connected!');
        app.listen(PORT, console.log('server listen on port: '+PORT));
    }).catch(err => console.log(err))
}
start();
