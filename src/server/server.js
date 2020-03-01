import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import ejs from "ejs";
const app = express();
const sum = require('./sum');

app.listen(3000, () => console.log("Server Up"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    city: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/../index.html');
})

app.get("/login", (req, res) => {
    res.send("hi");
})

app.post("/", (req,res) => {

    const newUser = new User ({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    city: req.body.city
  });

    newUser.save((err) => {
        if (!err) {
            res.render("thankYou", {fName: req.body.fName, lName: req.body.lName});

        } else {
            res.send(err);
        }


    });
})

console.log(sum(2,3));

