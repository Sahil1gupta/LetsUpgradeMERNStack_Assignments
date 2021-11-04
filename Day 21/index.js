const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let dummyResponse = { "Test": "Success!!" }



let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    city: String
})

let productSchema = new mongoose.Schema({
    title: String,
    type: String,
    description: String,
    price: Number,
    rating: Number
})


let usersModel = new mongoose.model('users', userSchema);

let productsModel = new mongoose.model('products', productSchema);

mongoose.connect("mongodb://127.0.0.1:27017/auth_assignment_db", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
    })

app.get('/', (req, res) => {
    res.send({ "Test": "Assignment Success!!" });
})

app.post('/user/register', (req, res) => {
    let user = req.body;

    let userData = new usersModel(user);
    userData.save().then(() => {
        res.send({ "message": "user Created" });
    });   
})

//ROUTE FOR LOGIN
app.post('/user/login', async (req, res) => {
    let userDetails = req.body;
    const count = await usersModel.find(userDetails).countDocuments();

    if (count == 1) {
        jwt.sign({ user: userDetails }, 'SecretKey-Geet', (err, token) => { 
            if (err == null)
            {
                res.send({ "token": token }); 
            }
            else {
                res.send({"message":"Some Problem!! Please Login after Sometime"})
            }
            
        })
    }
    else {
        res.send({ "message": "Wrong Username or Password" });
    }
})






app.get('/products/fetchProduct', verifyToken, (req, res) => {

    jwt.verify(req.token, 'SecretKey-Geet', (err, userDetails) => {
        if (err == null) {
            console.log(userDetails);

            let products = productsModel.find().then((product) => {
                res.send(JSON.stringify(product));
            });

            
        }
        else {
            res.send({"message": "Invalid Token"})
        }
    })
})

app.post('/products/insertProduct', verifyToken, (req, res) => {
    jwt.verify(req.token, 'SecretKey-Geet', (err, userDetails) => {
        if (err == null) {
            console.log(userDetails);
            let product = req.body;
            let productData = new productsModel(product);
            productData.save().then(() => {
                console.log("Product Inserted")
            })

            res.send({ "message": "Token Authenticated" });
        }
        else {
            res.send({"message": "Invalid Token"})
        }
    })
})



function verifyToken(req, res, next) {
    let headerData = req.headers.authorization;

    if (headerData != undefined) {
        let token = headerData.split(" ")[1];
        req.token = token;
        next();
    }
    else {
        res.status(403);
        res.send({ "message": "No Token Available" });
    }
    
}


app.listen(3000, () => {
    console.log('server running');
})
