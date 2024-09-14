const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require("mongoose");

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware to parse JSON request bodies
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/loginPage", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   console.log("db connected successfully");
}).catch(() => {
    console.log("rejected");
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

app.listen(8000, () => {
   console.log("Server Start");
});

app.post("/user", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = new User({
        email: email,
        password: password
    });

    try {
        await user.save();
        res.status(200).send("user created successfully");
    } catch (error) {
        res.status(500).send("error");
    }
});
