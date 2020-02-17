const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");

app.listen(3000, () => console.log("Server Up"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    city: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
})

app.post("/", (req,res) => {
    console.log(req.body.fName, req.body.lName, req.body.email, req.body.city);

    const newUser = new User ({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    city: req.body.city
  });

    newUser.save();

    res.redirect("/");
})