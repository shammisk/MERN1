const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");


const cors  =require('cors')

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ssamankumari6:Shammi%40123@cluster0.qfbnlht.mongodb.net/MERN1?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("connected", () => {
  console.log("Connected to MongoDB database");
});

app.get("/getUsers", async (req, res) => {
  try {
    // Query the database for all users
    const users = await UserModel.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const { name, age, username } = req.body;

    // Create a new user instance
    const newUser = new UserModel({ name, age, username });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("server is running port 5000");
});
