const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://f:f@my-fridge.bojzpqg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const UserModel = require('./userSchema');

let usr = new UserModel({
    userName : 'Bka387',
    password : '081298'
});

usr.save();
mongoose.connection.close();