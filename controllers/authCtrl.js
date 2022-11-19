const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../config/validation");

const registerUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(409).send("oops!..User Already Exist");
    // using bcrypyt to hash the password and save it to the database
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    }).then((user) =>
      res.status(200).json({
        message:"heyy u have been registered"
      })
    );
  } catch (error) {
    res.status(500).json("Some Error occurred");
  }
};
const loginUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(409).send("oops!..User Not Registered");

    // comparing the hashed password to the login input password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(409).send("Password is incorrect");

    // creating jwt token for private routes
    // here also, expiration is declared
   const id= user.id;
    const data = {
      user: {
        id
      },
    };
    jwt.sign(data, "isshhhh heyy im a secert", (err, token) => {
      // res.status(201).json({
      //   token,
      //   message: "heyyy we logged in and above that is our JWT Token",
      // });
      res.status(201).redirect("https://minerr-ai.herokuapp.com/")
    });
    
  } catch (error) {
    res.status(500).send("Some Error occurred");
  }
};

const getuser = async (req, res) => {
  try {
    const userId= req.user.id;
    const user= await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Some Error occurred");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getuser,
};
