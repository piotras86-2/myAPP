const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3000, () => console.log("Server Up"));


mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    city: String
});

const User = mongoose.model("User", userSchema);

// const newUser = new User ({
//     fName: "jan",
//     lName: "marian",
//     email: "piotr@wp.pl",
//     city: "Ojnice"
//   });

// newUser.save();

app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname});
})