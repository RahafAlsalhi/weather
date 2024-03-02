const express = require('express');
var http = require('http');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
var bodyParse= require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors)
app.set("view engine", "ejs");
const mongoose = require('mongoose');
var connect = mongoose.connect("mongodb+srv://rahafalsalhi:JyfM733qUo69WcUH@cluster0.c48chlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);
///////////
const info = new mongoose.Schema({
    name: {
        type:String
    },
    password: {
        type: String
    },
    email:{
        type:String
  }
});
const DataModel = mongoose.model('Data', dataSchema);

app.get('/api/data', async (req, res) => {
    try {
      const data = await DataModel.find();
      res.json(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
// Register User
app.post("/LoginSignup", async (req, res) => {

    const data = {
        name: req.body.name,
        password: req.body.password,
        email:req.body.email,
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        
        const userdata = await collection.insertMany(data);
    }

});

// Login user 
app.post("/LoginSignup", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (!check) {
            res.send("User name cannot found")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        const finduser= await userCollection.findOne({'name':req.body.name, 'password': req.body.password})
    if (finduser) 
        res.sendFile(__dirname+"/.weatherApp")
    }
    catch {
        res.send("wrong Details");
    }
});


// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});